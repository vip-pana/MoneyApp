namespace Backend.Utils.Exceptions
{
    public class UserAlreadyExistException : Exception
    {
        public override string Message => "User already registered.";
    }
}
