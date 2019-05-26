/* eslint-disable no-console */
var rs = require('jsrsasign');

var pass = 'testtesttest'
var algName = "RSA";
var kp = rs.KEYUTIL.generateKeypair(algName, 2048);

var publicKey = rs.KEYUTIL.getPEM(kp.pubKeyObj)
var privateKey = rs.KEYUTIL.getPEM(kp.prvKeyObj, "PKCS5PRV", pass)
console.log("public key:\n" + publicKey)
console.log("private key:\n" + privateKey)
console.log("done generating key.")
console.log('encrypting...')
var publicencrypt = rs.KEYUTIL.getKey(publicKey)
if (publicencrypt instanceof rs.RSAKey && publicencrypt.isPublic) {
  var encryptMessageTest = rs.KJUR.crypto.Cipher.encrypt("HOLA===HERE", publicencrypt, algName);
  console.log('encrypted')
  var b64encryptMessageTest = rs.hextob64(encryptMessageTest)
  console.log("encrypted message:\n" + b64encryptMessageTest)
}
console.log('getting key...')
var privatedecrypt = rs.KEYUTIL.getKey(privateKey, pass)
if (privatedecrypt instanceof rs.RSAKey && privatedecrypt.isPrivate) {

  console.log('Decryption Algorithm:' + rs.KJUR.crypto.Cipher.getAlgByKeyAndName(privatedecrypt))
  console.log("decrypting")
  var hexencryptMessageTest = rs.b64tohex(b64encryptMessageTest)
  var decryptedMessageTest = rs.KJUR.crypto.Cipher.decrypt(hexencryptMessageTest, privatedecrypt, algName);
  console.log("Unencrypted message:\n" + decryptedMessageTest);
  console.log("decrypted.")
}