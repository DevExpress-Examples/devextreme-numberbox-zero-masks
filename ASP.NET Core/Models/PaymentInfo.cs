using System;

namespace ASP_NET_Core.Models {
    public class PaymentInfo {
        public int PaymentId { get; set; }
        public string ContactName { get; set; }
        public string CompanyName { get; set; }
        public int Amount { get; set; }
        public DateTime PaymentDate { get; set; }
    }
}
