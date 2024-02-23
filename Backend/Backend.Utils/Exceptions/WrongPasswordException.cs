namespace Backend.Utils.Exceptions
{
    public class WrongPasswordException() : Exception
    {
        public override string Message => "The password is incorrect.";

    }
}
