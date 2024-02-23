namespace Backend.Utils.Exceptions
{
    public class GenericException(string message) : Exception
    {
        public override string Message => message;
    }
}
