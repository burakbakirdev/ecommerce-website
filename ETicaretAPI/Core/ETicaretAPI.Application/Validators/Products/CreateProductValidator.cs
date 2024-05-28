using ETicaretAPI.Application.ViewModels.Products;
using FluentValidation;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ETicaretAPI.Application.Validators.Products
{
    public class CreateProductValidator : AbstractValidator<VM_Create_Product>
    {
        public CreateProductValidator()
        {
            RuleFor(x => x.Name)
                .NotEmpty()
                    .WithMessage("Name is required")
                .NotNull()
                    .WithMessage("Name is required")
                .MaximumLength(150)
                .MinimumLength(2)
                    .WithMessage("Name must be between 2 and 150 characters");

            RuleFor(x => x.Stock)
                .NotNull()
                    .WithMessage("Stock is required")
                .Must(s => s >= 0)
                    .WithMessage("Stock must be greater than or equal to 0");


            RuleFor(x => x.Price)
                .NotNull()
                    .WithMessage("Price is required")
                .Must(p => p >= 0)
                    .WithMessage("Price must be greater than or equal to 0");
        }

    }
}
