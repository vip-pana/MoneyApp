﻿using Backend.Core.Enums;

namespace Backend.Core.Entities
{
    public class Category : BaseEntity
    {
        public required string Name {  get; set; }
        public required OperationType CategoryType { get; set; }
        public virtual List<SubCategory> SubCategories { get; set; } = [];
    }
}
