const { uuid } = require('uuidv4');
const {
  generateRegistrationOptions,
} = require('@simplewebauthn/server');

/**
 * RP ID represents the "scope" of websites on which a authenticator should be usable. The Origin
 * represents the expected URL from which registration or authentication occurs.
 */
const rpID = 'localhost';
const expectedOrigin = 'http://localhost:5005';

module.exports = ({
  Logger,
  repository,
}) => {
  const createUser = async (req, _, next) => {
    try {
      const { body: { username } } = req;
      let user = await repository.findUser(username);

      if (!user) {
        Logger.info(`User ${username} not exists, creating then...`);

        user = {
          id: uuid(),
          username,
          devices: [],
          currentChallenge: undefined,
        };

        await repository.createUser(user);
      }

      return Promise.resolve(username);
    } catch (err) {
      Logger.error(`Error creating user - ${err.message}`);
      return next(err);
    }
  };

  const authUser = async (req, _, next) => {
    try {
      const { body: { username } } = req;
      const userData = await repository.findUser(username);
      return !!userData;
    } catch (err) {
      Logger.error(`Error searching for a user - ${err.message}`);
      return next(err);
    }
  };

  const generateRegistration = async (req, _, next) => {
    try {
      const {
        username: userName,
        id: userID,
        devices,
      } = await repository.findUser(req.session.username);

      const opts = {
        rpName: 'SimpleWebAuthn Example',
        rpID,
        userID,
        userName,
        timeout: 60000,
        attestationType: 'indirect',
        /**
         * Passing in a user's list of already-registered authenticator IDs here prevents users from
         * registering the same device multiple times.
         * The authenticator will simply throw an error in
         * the browser if it's asked to perform registration when one of these ID's already resides
         * on it.
         */
        excludeCredentials: devices.map((dev) => ({
          id: dev.credentialID,
          type: 'public-key',
          transports: ['usb', 'ble', 'nfc', 'internal'],
        })),
        /**
         * The optional authenticatorSelection property
         * allows for specifying more constraints around
         * the types of authenticators that users to can use for registration
         */
        authenticatorSelection: {
          userVerification: 'preferred',
          requireResidentKey: false,
        },
        /**
         * Support the two most common algorithms: ES256, and RS256
         */
        supportedAlgorithmIDs: [-7, -257],
      };

      const options = generateRegistrationOptions(opts);
      /**
       * The server needs to temporarily remember this value for verification,
       * so don't lose it until
       * after you verify an authenticator response.
       */
      repository.updateCurrentChallenge(userName, options.challenge);

      return options;
    } catch (err) {
      Logger.error(`Error registering UVA ${req.body.username} - ${err.message}`);
      return next(err);
    }
  };

  const verifyRegistration = async (req, _, next) => {
    let verification;
    let user;
    const { body } = req;

    try {
      user = await repository.findUser(req.session.username);

      const opts = {
        credential: body,
        expectedChallenge: `${user.currentChallenge}`,
        expectedOrigin,
        expectedRPID: rpID,
      };

      verification = await repository.verifyRegistrationResponse(opts);
    } catch (err) {
      Logger.error(`Error validating the register of UVA ${body.username} - ${err.message}`);
      return next(err);
    }

    const { verified, registrationInfo } = verification;

    if (verified && registrationInfo) {
      const { credentialPublicKey, credentialID, counter } = registrationInfo;

      const existingDevice = user.devices.find((device) => device.credentialID === credentialID);

      if (!existingDevice) {
        /**
         * Add the returned device to the user's list of devices
         */
        const newDevice = {
          credentialPublicKey,
          credentialID,
          counter,
          transports: body.transports,
        };
        user.devices.push(newDevice);
      }
    }
    return verified;
  };

  return {
    createUser,
    authUser,
    generateRegistration,
    verifyRegistration,
  };
};
