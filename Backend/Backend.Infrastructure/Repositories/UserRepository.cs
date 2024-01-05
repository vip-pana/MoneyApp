using System.Security.Cryptography;
using System.Text;
using Backend.Core.Entities;
using Backend.Core.Repositories;
using Backend.Infrastructure.Data;
using MongoDB.Driver;

namespace Backend.Infrastructure.Repositories
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        public UserRepository(IDbContext context) : base(context) 
        {
        }

        public async Task<User> Signup(User user)
        {
            user.Password = HashPassword(user.Password);

            await collection.InsertOneAsync(user);

            return user;
        }
        public async Task<User> GetByEmailAsync(string email)
        {
            var filter = Builders<User>.Filter.Eq(_ => _.Email, email);
            return await collection.Find(filter).FirstOrDefaultAsync();
        }

        private string HashPassword(string password)
        {
            byte[] salt = new byte[16];
            using (var rng = RandomNumberGenerator.Create())
            {
                rng.GetBytes(salt);
            }

            byte[] passwordBytes = Encoding.UTF8.GetBytes(password);
            byte[] saltedPassword = new byte[passwordBytes.Length + salt.Length];
            Buffer.BlockCopy(passwordBytes, 0, saltedPassword, 0, passwordBytes.Length);
            Buffer.BlockCopy(salt, 0, saltedPassword, passwordBytes.Length, salt.Length);

            using (var sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(password));

                var builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }

                return builder.ToString();
            }
        }

        private bool VerifyPassword(string inputPassword, string hashedPassword)
        {
            byte[] hashWithSaltBytes = Convert.FromBase64String(hashedPassword);
            byte[] salt = new byte[16];
            Buffer.BlockCopy(hashWithSaltBytes, hashWithSaltBytes.Length - salt.Length, salt, 0, salt.Length);

            byte[] passwordBytes = Encoding.UTF8.GetBytes(inputPassword);
            byte[] saltedPassword = new byte[passwordBytes.Length + salt.Length];
            Buffer.BlockCopy(passwordBytes, 0, saltedPassword, 0, passwordBytes.Length);
            Buffer.BlockCopy(salt, 0, saltedPassword, passwordBytes.Length, salt.Length);

            byte[] hashedInput;
            using (var sha256Hash = SHA256.Create())
            {
                hashedInput = sha256Hash.ComputeHash(saltedPassword);
            }

            byte[] storedHash = new byte[hashWithSaltBytes.Length - salt.Length];
            Buffer.BlockCopy(hashWithSaltBytes, 0, storedHash, 0, storedHash.Length);

            for (int i = 0; i < storedHash.Length; i++)
            {
                if (storedHash[i] != hashedInput[i])
                    return false;
            }
            return true;
        }
    }
}
