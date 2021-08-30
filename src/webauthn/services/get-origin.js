module.exports = (userAgent) => {
  if (userAgent.indexOf('okhttp') === 0) {
    const octArray = process.env.ANDROID_SHA256HASH.split(':').map((h) =>
      parseInt(h, 16),
    );
    const androidHash = base64url.encode(octArray);
    return `android:apk-key-hash:${androidHash}`;
  }
  
  return process.env.ORIGIN;
}
