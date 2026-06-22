import { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Send, CheckCircle2 } from "lucide-react";
import contactimg from "../../assets/contact.png";
export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.phone && formState.message) {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormState({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      }, 7000);
    }
  };

  return (
    <div className="bg-brand-light min-h-screen" id="contact-page">
      
      {/* Header */}
      <section className="pt-16 pb-12 px-6 md:px-12 max-w-7xl mx-auto text-center border-b border-brand-purple/10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="space-y-4"
        >
          <span className="text-xs uppercase tracking-widest text-[#CC9838] font-semibold">
            Get in Touch
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-brand-dark leading-tight">
            One Conversation Can Change Everything…
          </h1>
          <p className="text-base text-brand-dark/70 max-w-2xl mx-auto leading-relaxed">
            Have a question, enquiry, partnership proposal, or idea? Fill out the form below and a member of our team will get back to you as soon as possible.
          </p>
        </motion.div>
      </section>

      {/* Contact Form & Image Section */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 bg-white border border-brand-purple/10 shadow-sm">
          
          {/* Left Side - Image */}
          <div className="h-full min-h-[400px] lg:min-h-full">
            <img
              src={contactimg}
              alt="Women at PWWE Foundation"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Right Side - Form */}
          <div className="p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-2xl font-bold text-brand-dark mb-2">
              Send us a message
            </h2>
            <p className="text-sm text-brand-dark/60 mb-8">
              Fields marked with * are required. We'll get back to you within 1–2 business days.
            </p>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#FAF3FA] border border-brand-purple text-brand-dark p-6 space-y-3"
              >
                <div className="flex items-center gap-2 text-brand-purple">
                  <CheckCircle2 size={20} />
                  <span className="text-lg font-bold">Thank you! Your message has been received.</span>
                </div>
                <p className="text-sm leading-relaxed text-brand-dark/80">
                  <strong>{formState.name}</strong>, we've received your message. A member of our team will respond to <strong>{formState.email}</strong> shortly.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5" id="contact-form">
                {/* Full Name */}
                <div className="space-y-2">
                  <label htmlFor="contact-name" className="block text-xs uppercase text-brand-dark/70 tracking-widest font-semibold">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="contact-name"
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    required
                    placeholder="Your full name"
                    className="w-full bg-brand-light border border-brand-purple/15 focus:border-[#CC9838] focus:outline-none px-4 py-3 text-sm text-brand-dark transition-all duration-200"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-2">
                  <label htmlFor="contact-email" className="block text-xs uppercase text-brand-dark/70 tracking-widest font-semibold">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="contact-email"
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    required
                    placeholder="you@example.com"
                    className="w-full bg-brand-light border border-brand-purple/15 focus:border-[#CC9838] focus:outline-none px-4 py-3 text-sm text-brand-dark transition-all duration-200"
                  />
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <label htmlFor="contact-phone" className="block text-xs uppercase text-brand-dark/70 tracking-widest font-semibold">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="contact-phone"
                    value={formState.phone}
                    onChange={(e) => setFormState({ ...formState, phone: e.target.value })}
                    required
                    placeholder="+234 000 000 0000"
                    className="w-full bg-brand-light border border-brand-purple/15 focus:border-[#CC9838] focus:outline-none px-4 py-3 text-sm text-brand-dark transition-all duration-200"
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label htmlFor="contact-message" className="block text-xs uppercase text-brand-dark/70 tracking-widest font-semibold">
                    Tell us briefly how we can help you... *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    required
                    placeholder="Let us know what you need, whether it's joining a cooperative, skills training, or a partnership enquiry..."
                    className="w-full bg-brand-light border border-brand-purple/15 focus:border-[#CC9838] focus:outline-none px-4 py-3 text-sm text-brand-dark transition-all duration-200 resize-none"
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-4 bg-brand-purple text-white text-sm uppercase tracking-wider font-semibold hover:bg-brand-dark transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                  id="contact-submit-btn"
                >
                  <span>Send Message</span>
                  <Send size={14} />
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* Contact Details */}
      <section className="py-16 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid sm:grid-cols-3 gap-6">
          
          {/* Address */}
          <div className="bg-white p-6 text-center border border-brand-purple/10 hover:border-brand-purple transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-brand-purple-light text-brand-purple">
                <MapPin size={20} />
              </div>
            </div>
            <h3 className="text-base font-bold text-brand-dark mb-2">Head Office</h3>
            <p className="text-sm text-brand-dark/70 leading-relaxed">
              2nd Floor, ACNE Building,<br />
              Jericho, Ibadan,<br />
              Oyo State.
            </p>
          </div>

          {/* Phone */}
          <div className="bg-white p-6 text-center border border-brand-purple/10 hover:border-brand-purple transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-brand-purple-light text-brand-purple">
                <Phone size={20} />
              </div>
            </div>
            <h3 className="text-base font-bold text-brand-dark mb-2">Call Us</h3>
            <a href="tel:+2349031463004" className="text-sm text-brand-dark/70 hover:text-brand-purple transition-colors">
              +234 903 146 3004
            </a>
          </div>

          {/* Email */}
          <div className="bg-white p-6 text-center border border-brand-purple/10 hover:border-brand-purple transition-all duration-300">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-brand-purple-light text-brand-purple">
                <Mail size={20} />
              </div>
            </div>
            <h3 className="text-base font-bold text-brand-dark mb-2">Email Us</h3>
            <div className="space-y-1">
              <a href="mailto:info@pwwefoundation.com" className="block text-sm text-brand-dark/70 hover:text-brand-purple transition-colors">
                info@pwwefoundation.com
              </a>
              <a href="mailto:contact@pwwefoundation.com" className="block text-sm text-brand-dark/70 hover:text-brand-purple transition-colors">
                contact@pwwefoundation.com
              </a>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}