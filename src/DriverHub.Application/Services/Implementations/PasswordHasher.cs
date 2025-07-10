using DriverHub.Application.Services;
using System;
using System.Security.Cryptography;
using System.Text;

namespace DriverHub.Application.Services.Implementations
{
    public class PasswordHasher : IPasswordHasher
    {
        private const int SaltSize = 16; // 128 bits
        private const int KeySize = 32; // 256 bits
        private const int Iterations = 10000;

        public string HashPassword(string password)
        {
            using (var algorithm = new Rfc2898DeriveBytes(password, SaltSize, Iterations, HashAlgorithmName.SHA256))
            {
                var salt = algorithm.Salt;
                var hash = algorithm.GetBytes(KeySize);
                return $"{Convert.ToBase64String(hash)}:{Convert.ToBase64String(salt)}";
            }
        }

        public bool VerifyPassword(string password, string storedHash, string storedSalt)
        {
            var saltBytes = Convert.FromBase64String(storedSalt);
            var hashBytes = Convert.FromBase64String(storedHash);

            using (var algorithm = new Rfc2898DeriveBytes(password, saltBytes, Iterations, HashAlgorithmName.SHA256))
            {
                var inputHash = algorithm.GetBytes(KeySize);
                for (int i = 0; i < KeySize; i++)
                {
                    if (inputHash[i] != hashBytes[i])
                    {
                        return false;
                    }
                }
                return true;
            }
        }
    }
}