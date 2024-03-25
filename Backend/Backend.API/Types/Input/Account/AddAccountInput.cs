using Backend.Core.Enums;

namespace Backend.API.Types.Input.Account
{
    public class AddAccountInput : BaseInput
    {
        public required string Name { get; set; }
        public required Currency SelectedCurrency { get; set; }
    }
}
