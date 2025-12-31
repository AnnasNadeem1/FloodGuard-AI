const About = () => {
  return (
    <div className="bg-[#F9FBFF] text-gray-800">

      {/* HERO SECTION */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1 mb-6 text-sm font-medium text-blue-600 bg-blue-100 rounded-full">
          About FloodGuard AI
        </span>

        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-6">
          Transforming Disaster Response with
          <span className="text-blue-600"> Artificial Intelligence</span>
        </h1>

        <p className="max-w-3xl mx-auto text-lg text-gray-600">
          FloodGuard AI is a smart disaster analysis platform designed to help
          governments, relief organizations, and communities respond faster
          and smarter to flood emergencies.
        </p>
      </section>

      {/* MISSION + VISION */}
      <section className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-2xl font-bold mb-4">Our Mission</h3>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to reduce human and economic loss during floods by
            leveraging AI-driven image analysis. We aim to provide instant,
            accurate flood severity detection so decision-makers can act with
            confidence when every second matters.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-8">
          <h3 className="text-2xl font-bold mb-4">Our Vision</h3>
          <p className="text-gray-600 leading-relaxed">
            We envision a future where disaster response is proactive, data-driven,
            and globally accessible. FloodGuard AI strives to become a trusted
            intelligence layer for emergency response systems worldwide.
          </p>
        </div>
      </section>

      {/* HOW WE HELP */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <h2 className="text-3xl font-bold text-center mb-4">Why FloodGuard AI?</h2>
        <p className="text-center text-gray-600 max-w-2xl mx-auto mb-14">
          Designed for speed, accuracy, and real-world impact.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-blue-100 text-blue-600 rounded-xl text-xl font-bold">
              AI
            </div>
            <h4 className="font-semibold text-lg mb-2">Intelligent Analysis</h4>
            <p className="text-gray-600 text-sm">
              Advanced computer vision models analyze flood imagery
              to classify severity levels accurately.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-blue-100 text-blue-600 rounded-xl text-xl font-bold">
              ⚡
            </div>
            <h4 className="font-semibold text-lg mb-2">Rapid Response</h4>
            <p className="text-gray-600 text-sm">
              Real-time insights allow emergency teams to respond
              faster and allocate resources efficiently.
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-blue-100 text-blue-600 rounded-xl text-xl font-bold">
              📊
            </div>
            <h4 className="font-semibold text-lg mb-2">Actionable Reports</h4>
            <p className="text-gray-600 text-sm">
              Automatically generated reports support strategic
              planning and post-disaster assessment.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Ready to Make Smarter Disaster Decisions?
        </h2>
        <p className="mb-8 text-blue-100">
          Start analyzing flood imagery and generating insights today.
        </p>

        <button className="bg-white text-blue-600 font-semibold px-8 py-3 rounded-xl shadow hover:bg-blue-50 transition">
          Get Started
        </button>
      </section>

    </div>
  );
};

export default About;
