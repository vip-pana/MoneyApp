using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Backend.Utils.Exceptions
{
    public class FieldIdNotExistException : Exception
    {
        public override string Message => "A Transaction not have the Id or not Exist.";
    }
}
