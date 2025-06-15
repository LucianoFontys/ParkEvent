using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using Microsoft.AspNetCore.Mvc.Rendering;
using ParkEvent.SQL;
using ParkEvent.Business;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;

namespace ParkEvent.Pages
{
    public class EventManagerModel : PageModel
    {
        /*private readonly AppDbContext _context;

        public EventManagerModel(AppDbContext context)
        {
            _context = context;
        }

        public List<User> Users { get; set; }

        [BindProperty]
        public int? SelectedUserId { get; set; }

        public async Task OnGetAsync()
        {
            Users = await _context.Users.Select(u => new SelectListItem
            {
                ValueTask = u.Id.ToString(),
                TextReader = u.Name
            }).tolistAsync();
        }

        public async Task<IActionResult> OnPostAsync()
        {
            Users = await _context.Users
                .Select(u => new SelectListItem
                {
                    Value = u.Id.ToString(),
                    Text = u.Name
                })
                .ToListAsync();

            if (!SelectedUserId.HasValue)
            {
                ModelState.AddModelError(string.Empty, "Please select a user.");
                return Page();
            }*/


        public void OnGet()
        {
        }
    }
}
