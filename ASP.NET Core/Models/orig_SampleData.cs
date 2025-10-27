using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ASP_NET_Core.Models
{
    static class SampleData
    {
        public static List<PaymentInfo> Payments = new List<PaymentInfo>() {
            new PaymentInfo {
                PaymentId = 10248,
                PaymentDate = new DateTime(1996, 7, 4),
                ContactName = "Paul Henriot",
                Amount = 1740
            },
            new PaymentInfo {
                PaymentId = 10249,
                PaymentDate = new DateTime(1996, 7, 5),
                Amount = 850,
                ContactName = "Karin Josephs"
            },
            new PaymentInfo {
                PaymentId = 10250,
                PaymentDate = new DateTime(1996, 7, 8),
                Amount = 2235,
                ContactName = "Mario Pontes"
            },
            new PaymentInfo {
                PaymentId = 10251,
                PaymentDate = new DateTime(1996, 7, 8),
               Amount = 1965,
                ContactName = "Mary Saveley"
            },
            new PaymentInfo {
                PaymentId = 10252,
                PaymentDate = new DateTime(1996, 7, 9),
                Amount = 880,
                ContactName = "Pascale Cartrain"
            },
            new PaymentInfo {
                PaymentId = 10253,
                PaymentDate = new DateTime(1996, 7, 10),
                Amount = 5260,
                ContactName = "Mario Pontes"
            },
            new PaymentInfo {
                PaymentId = 10254,
                PaymentDate = new DateTime(1996, 7, 11),
               Amount = 2790,
                ContactName = "Yang Wang"
            },
            new PaymentInfo {
                PaymentId = 10255,
                PaymentDate = new DateTime(1996, 7, 12),
               Amount = 3140,
                ContactName = "Michael Holz"
            },
            new PaymentInfo {
                PaymentId = 10256,
                PaymentDate = new DateTime(1996, 7, 15),
                Amount= 6175,
                ContactName = "Paula Parente"
            },
            new PaymentInfo {
                PaymentId = 10257,
                PaymentDate = new DateTime(1996, 7, 16),
               Amount =  6175,
                ContactName = "Carlos Hernández"
            },
            new PaymentInfo {
                PaymentId = 10258,
                PaymentDate = new DateTime(1996, 7, 17),
                Amount =  9075,
                ContactName = "Roland Mendel"
            },

        };
    }
}
