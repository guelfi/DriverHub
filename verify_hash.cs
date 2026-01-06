using System.Security.Cryptography;
using System;

string password = "@5ST73EA4x";
string saltBase64 = "WAvncHfcAFWyODBzx7CVPg==";
int KeySize = 32;
int Iterations = 10000;

byte[] salt = Convert.FromBase64String(saltBase64);

using (var algorithm = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256))
{
    var hash = algorithm.GetBytes(KeySize);
    Console.WriteLine($"HASH GENERATED: {Convert.ToBase64String(hash)}");
}
