namespace Backend.Utils.Exceptions
{
    public class UserNotExistException(string Email) : Exception
    {
        public override string Message => $"{Email} is not already registered.";
    }
}
