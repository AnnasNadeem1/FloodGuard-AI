const Contact = () => {
  return (
    <div className="bg-[#F9FBFF] text-gray-800">

      {/* HERO */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1 mb-6 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
          Contact FloodGuard AI
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
          Get in
          <span className="text-blue-600"> Touch</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-gray-600">
          Have questions, feedback, or partnership inquiries?
          We’d love to hear from you.
        </p>
      </section>

      {/* CONTACT SECTION */}
      <section className="max-w-6xl mx-auto px-6 pb-24 grid md:grid-cols-2 gap-12">

        {/* CONTACT INFO */}
        <div className="bg-white rounded-2xl shadow-sm p-10">
          <h3 className="text-2xl font-bold mb-6">Contact Information</h3>

          <p className="text-gray-600 mb-8 leading-relaxed">
            Reach out to FloodGuard AI for support, collaborations,
            or to learn how our platform can assist disaster response efforts.
          </p>

          <div className="space-y-6">
            <div>
              <h4 className="font-semibold">Email</h4>
              <p className="text-gray-600">support@floodguardai.com</p>
            </div>

            <div>
              <h4 className="font-semibold">Phone</h4>
              <p className="text-gray-600">+92 (333) 123-4567</p>
            </div>

            <div>
              <h4 className="font-semibold">Location</h4>
              <p className="text-gray-600">
                Global — Serving disaster response teams worldwide
              </p>
            </div>
          </div>
        </div>

        {/* CONTACT FORM */}
        <div className="bg-white rounded-2xl shadow-sm p-10">
          <h3 className="text-2xl font-bold mb-6">Send Us a Message</h3>

          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Email Address
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                Message
              </label>
              <textarea
                rows="4"
                placeholder="Write your message..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl bg-white text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white font-semibold py-3 rounded-xl shadow hover:bg-blue-700 transition"
            >
              Send Message
            </button>
          </form>
        </div>

      </section>

    </div>
  );
};

export default Contact;
