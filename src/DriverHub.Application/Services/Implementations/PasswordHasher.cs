using System.Security.Cryptography;
using System.Text;

namespace DriverHub.Application.Services.Implementations
{
    public class PasswordHasher : IPasswordHasher
    {
        private const int SaltSize = 16; // 128 bits
        private const int KeySize = 32; // 256 bits
        private const int Iterations = 10000;

        public (string hash, string salt) HashPassword(string password)
        {
            using (var algorithm = new Rfc2898DeriveBytes(password, SaltSize, Iterations, HashAlgorithmName.SHA256))
            {
                var salt = algorithm.Salt;
                var hash = algorithm.GetBytes(KeySize);
                return (Convert.ToBase64String(hash), Convert.ToBase64String(salt));
            }
        }

        public bool VerifyPassword(string password, string hash, string salt)
        {
            var saltBytes = Convert.FromBase64String(salt);
            var hashBytes = Convert.FromBase64String(hash);

            using (var algorithm = new Rfc2898DeriveBytes(password, saltBytes, Iterations, HashAlgorithmName.SHA256))
            {
                var inputHash = algorithm.GetBytes(KeySize);
                return CryptographicOperations.FixedTimeEquals(inputHash, hashBytes);
            }
        }
    }
}
