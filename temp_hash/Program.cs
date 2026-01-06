using System.Security.Cryptography;
using System;

string password = "admin123";
int SaltSize = 16;
int KeySize = 32;
int Iterations = 10000;

using (var algorithm = new Rfc2898DeriveBytes(password, SaltSize, Iterations, HashAlgorithmName.SHA256))
{
    var salt = algorithm.Salt;
    var hash = algorithm.GetBytes(KeySize);
    Console.WriteLine($"HASH: {Convert.ToBase64String(hash)}");
    Console.WriteLine($"SALT: {Convert.ToBase64String(salt)}");
}
