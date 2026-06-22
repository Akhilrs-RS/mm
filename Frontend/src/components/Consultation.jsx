import React from 'react';
import { Calendar as CalendarIcon, Clock, User, MessageSquare, CheckCircle, Sparkles } from 'lucide-react';
import { consultants } from '../data/products';

export default function Consultation() {
  // Booking Steps
  const [step, setStep] = React.useState(1); // 1: Class, 2: Date & Slot, 3: Advisor, 4: Bio Details, 5: Success
  
  // Selection States
  const [consultType, setConsultType] = React.useState('bespoke'); // tour, bespoke, gemstone
  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedSlot, setSelectedSlot] = React.useState(null);
  const [selectedAdvisor, setSelectedAdvisor] = React.useState(consultants[0]);
  const [formData, setFormData] = React.useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });

  // Calendar dates setup (generate next 8 days)
  const getUpcomingDays = () => {
    const days = [];
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    for (let i = 1; i <= 8; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      days.push({
        fullDate: d,
        dayName: weekdays[d.getDay()],
        dayNum: d.getDate(),
        month: months[d.getMonth()]
      });
    }
    return days;
  };

  const dates = getUpcomingDays();
  const timeSlots = ['10:00 AM', '11:30 AM', '02:00 PM', '04:00 PM', '05:30 PM'];

  React.useEffect(() => {
    // Default select first date
    if (!selectedDate) setSelectedDate(dates[0]);
  }, []);

  const handleNextStep = () => {
    if (step === 2 && !selectedSlot) {
      alert("Please select an appointment time slot.");
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.phone) {
      alert("Please fill out all mandatory contact fields.");
      return;
    }
    setStep(5); // Show Success Certificate
  };

  const resetBooking = () => {
    setStep(1);
    setSelectedSlot(null);
    setFormData({ name: '', email: '', phone: '', notes: '' });
  };

  return (
    <section className="py-12 bg-luxury-ivory dark:bg-luxury-onyx-dark transition-colors duration-300 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="border-b border-black/10 dark:border-white/10 pb-6 mb-10">
          <span className="text-xs uppercase tracking-widest text-luxury-gold font-bold flex items-center gap-1.5">
            <CalendarIcon className="w-3.5 h-3.5" /> Luxury Showroom
          </span>
          <h1 className="font-cinzel text-3xl sm:text-4xl font-bold tracking-wider text-luxury-onyx dark:text-luxury-ivory mt-2">
            Private Consultation
          </h1>
          <p className="font-sans text-xs sm:text-sm text-luxury-onyx/60 dark:text-luxury-ivory/60 mt-1 max-w-2xl">
            Book a virtual or in-person design consultation with a GIA-certified gemologist. Sketch custom settings, examine diamond grading, or take a private video tour of the showroom.
          </p>
        </div>

        {/* Step Progress Bar */}
        {step < 5 && (
          <div className="flex justify-between items-center mb-10 max-w-2xl mx-auto px-4">
            {[
              { num: 1, name: 'Service' },
              { num: 2, name: 'Time' },
              { num: 3, name: 'Gemologist' },
              { num: 4, name: 'Details' }
            ].map((s) => (
              <div key={s.num} className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-sans text-xs font-bold border transition-all ${
                  step === s.num
                    ? 'border-luxury-gold bg-luxury-gold text-luxury-onyx shadow-md font-extrabold scale-110'
                    : step > s.num
                      ? 'border-luxury-gold bg-luxury-gold/10 text-luxury-gold font-bold'
                      : 'border-black/10 dark:border-white/10 text-luxury-onyx/40 dark:text-luxury-ivory/40'
                }`}>
                  {s.num}
                </div>
                <span className={`text-[10px] uppercase tracking-wider font-bold hidden sm:inline ${
                  step === s.num ? 'text-luxury-gold' : 'text-luxury-onyx/50 dark:text-luxury-ivory/50'
                }`}>
                  {s.name}
                </span>
                {s.num < 4 && (
                  <div className="w-8 sm:w-16 h-[1px] bg-black/10 dark:bg-white/10 ml-2" />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Booking Form Layout */}
        {step < 5 ? (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start max-w-5xl mx-auto">
            
            {/* Step Content Area (Left 7 Cols) */}
            <div className="lg:col-span-8 p-6 sm:p-8 luxury-glass rounded-2xl border border-luxury-gold/15 min-h-[380px] flex flex-col justify-between">
              
              {/* STEP 1: Service selection */}
              {step === 1 && (
                <div className="space-y-6">
                  <h3 className="font-cinzel text-lg font-bold border-b border-black/5 dark:border-white/5 pb-2">
                    Select Consultation Class
                  </h3>
                  <div className="flex flex-col gap-4">
                    {[
                      { id: 'bespoke', title: 'Bespoke Heirloom Customization', desc: 'Design an engagement ring or custom band from scratch. Involves sketching details, picking exact metals, and selecting diamond cuts.', time: '60 minutes', price: 'Complimentary' },
                      { id: 'tour', title: 'Virtual Showroom Boutique Tour', desc: 'A personal luxury concierge takes you on a high-definition private tour of our Milan boutique showcasing our core heirloom layouts.', time: '30 minutes', price: 'Complimentary' },
                      { id: 'gemstone', title: 'Rare Diamond & Gemstone Inspection', desc: 'Deep-dive into carat grading, VVS clarity details, GIA certificates, and sourcing ethics. Perfect for selecting a loose gemstone.', time: '45 minutes', price: 'Complimentary' }
                    ].map((serv) => (
                      <button
                        key={serv.id}
                        onClick={() => setConsultType(serv.id)}
                        className={`p-4 border rounded-xl text-left flex justify-between items-start gap-4 transition-all ${
                          consultType === serv.id
                            ? 'border-luxury-gold bg-luxury-gold/5 shadow-sm'
                            : 'border-black/10 dark:border-white/10 hover:border-luxury-gold/50'
                        }`}
                      >
                        <div className="space-y-1">
                          <h4 className="font-cinzel text-sm font-bold text-luxury-onyx dark:text-luxury-ivory">{serv.title}</h4>
                          <p className="font-sans text-xs text-luxury-onyx/65 dark:text-luxury-ivory/65 leading-relaxed">{serv.desc}</p>
                          <div className="flex gap-4 pt-2 text-[10px] font-sans font-bold text-luxury-gold uppercase tracking-wider">
                            <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {serv.time}</span>
                            <span>{serv.price}</span>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 2: Date and Time slots */}
              {step === 2 && (
                <div className="space-y-6">
                  <h3 className="font-cinzel text-lg font-bold border-b border-black/5 dark:border-white/5 pb-2">
                    Select Date & Time Slot
                  </h3>
                  
                  {/* Calendar horizontal list */}
                  <div className="space-y-2">
                    <span className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 font-bold uppercase tracking-wider">Upcoming Dates</span>
                    <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-thin">
                      {dates.map((date, idx) => (
                        <button
                          key={idx}
                          onClick={() => { setSelectedDate(date); setSelectedSlot(null); }}
                          className={`flex flex-col items-center justify-center p-3 rounded-lg border min-w-[70px] transition-all ${
                            selectedDate?.dayNum === date.dayNum
                              ? 'border-luxury-gold bg-luxury-gold text-luxury-onyx shadow-md scale-105'
                              : 'border-black/10 dark:border-white/10 text-luxury-onyx dark:text-luxury-ivory hover:border-luxury-gold/50'
                          }`}
                        >
                          <span className="text-[10px] uppercase font-bold tracking-wider">{date.dayName}</span>
                          <span className="font-cinzel text-lg font-extrabold mt-0.5">{date.dayNum}</span>
                          <span className="text-[9px] uppercase font-semibold">{date.month}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Time slot grid */}
                  <div className="space-y-2 pt-2">
                    <span className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 font-bold uppercase tracking-wider">Available Slots</span>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          onClick={() => setSelectedSlot(slot)}
                          className={`p-3 rounded-lg border text-xs font-sans text-center transition-all ${
                            selectedSlot === slot
                              ? 'border-luxury-gold bg-luxury-gold/5 text-luxury-gold font-bold scale-102'
                              : 'border-black/10 dark:border-white/10 text-luxury-onyx dark:text-luxury-ivory hover:border-luxury-gold/50'
                          }`}
                        >
                          {slot}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Advisor choosing */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="font-cinzel text-lg font-bold border-b border-black/5 dark:border-white/5 pb-2">
                    Match GIA Consultant
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {consultants.map((adv) => (
                      <button
                        key={adv.id}
                        onClick={() => setSelectedAdvisor(adv)}
                        className={`p-4 border rounded-xl flex flex-col items-center text-center gap-3 transition-all ${
                          selectedAdvisor.id === adv.id
                            ? 'border-luxury-gold bg-luxury-gold/5 shadow-md scale-102'
                            : 'border-black/15 dark:border-white/15 hover:border-luxury-gold/50'
                        }`}
                      >
                        <img src={adv.image} alt={adv.name} className="w-16 h-16 rounded-full object-cover border border-luxury-gold/30 shadow-sm" />
                        <div className="space-y-1">
                          <h4 className="font-cinzel text-xs font-bold text-luxury-onyx dark:text-luxury-ivory">{adv.name}</h4>
                          <span className="text-[9px] uppercase tracking-wider text-luxury-gold font-semibold block">{adv.role}</span>
                          <p className="font-sans text-[10px] text-luxury-onyx/60 dark:text-luxury-ivory/60 line-clamp-3 leading-relaxed mt-1">
                            {adv.bio}
                          </p>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* STEP 4: Client contact and notes */}
              {step === 4 && (
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  <h3 className="font-cinzel text-lg font-bold border-b border-black/5 dark:border-white/5 pb-2">
                    Enter Personal Details
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 font-bold uppercase tracking-wider block">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        placeholder="Victoria Belmont"
                        className="w-full px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-lg text-xs focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 font-bold uppercase tracking-wider block">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        placeholder="victoria@belmont.com"
                        className="w-full px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-lg text-xs focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1">
                      <label className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 font-bold uppercase tracking-wider block">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        placeholder="+39 (02) 1234567"
                        className="w-full px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-lg text-xs focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory"
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-[10px] text-luxury-onyx/50 dark:text-luxury-ivory/50 font-bold uppercase tracking-wider block">Design Aspirations (Optional)</label>
                      <input
                        type="text"
                        value={formData.notes}
                        onChange={(e) => setFormData({...formData, notes: e.target.value})}
                        placeholder="E.g., custom diamond cut stacks"
                        className="w-full px-3 py-2 bg-black/5 dark:bg-white/5 border border-black/15 dark:border-white/15 rounded-lg text-xs focus:outline-none focus:border-luxury-gold text-luxury-onyx dark:text-luxury-ivory"
                      />
                    </div>
                  </div>
                  <button type="submit" className="hidden" id="submitBookingForm" />
                </form>
              )}

              {/* Back / Next buttons */}
              <div className="flex justify-between items-center border-t border-black/10 dark:border-white/10 pt-6 mt-8">
                <button
                  onClick={() => setStep(prev => Math.max(1, prev - 1))}
                  className={`text-xs font-semibold uppercase tracking-wider text-luxury-onyx/60 dark:text-luxury-ivory/60 hover:text-luxury-gold ${
                    step === 1 ? 'opacity-0 pointer-events-none' : ''
                  }`}
                >
                  Back
                </button>
                {step < 4 ? (
                  <button
                    onClick={handleNextStep}
                    className="gold-gradient-button px-6 py-2.5 rounded-lg text-xs uppercase tracking-widest font-semibold font-cinzel"
                  >
                    Next Step
                  </button>
                ) : (
                  <label
                    htmlFor="submitBookingForm"
                    className="gold-gradient-button px-6 py-2.5 rounded-lg text-xs uppercase tracking-widest font-semibold font-cinzel cursor-pointer text-center"
                  >
                    Confirm Booking
                  </label>
                )}
              </div>
            </div>

            {/* Right Booking Summary Card (Right 4 Cols) */}
            <div className="lg:col-span-4 p-5 luxury-glass rounded-2xl border border-luxury-gold/15 space-y-4">
              <h3 className="font-cinzel font-bold text-sm tracking-wider uppercase text-luxury-onyx dark:text-luxury-ivory">
                Booking Summary
              </h3>
              <div className="space-y-4 text-xs font-sans text-luxury-onyx/75 dark:text-luxury-ivory/75">
                
                {/* Service Type */}
                <div className="flex gap-3 items-start border-b border-black/5 dark:border-white/5 pb-3">
                  <Sparkles className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] uppercase font-bold text-luxury-gold">Selected Class</span>
                    <p className="font-cinzel text-xs font-bold text-luxury-onyx dark:text-luxury-ivory mt-0.5">
                      {consultType === 'bespoke' 
                        ? 'Bespoke Heirloom Customization' 
                        : consultType === 'tour' 
                          ? 'Virtual Showroom Boutique Tour' 
                          : 'Rare Diamond & Gemstone Inspection'}
                    </p>
                  </div>
                </div>

                {/* Date slot */}
                <div className="flex gap-3 items-start border-b border-black/5 dark:border-white/5 pb-3">
                  <Clock className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] uppercase font-bold text-luxury-gold">Date & Time</span>
                    <p className="font-bold text-luxury-onyx dark:text-luxury-ivory mt-0.5">
                      {selectedSlot 
                        ? `${selectedDate?.dayName}, ${selectedDate?.month} ${selectedDate?.dayNum} at ${selectedSlot}` 
                        : 'Select date & time slot...'}
                    </p>
                  </div>
                </div>

                {/* Advisor selection */}
                <div className="flex gap-3 items-start border-b border-black/5 dark:border-white/5 pb-3">
                  <User className="w-4 h-4 text-luxury-gold shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[9px] uppercase font-bold text-luxury-gold">Matched Gemologist</span>
                    <p className="font-cinzel text-xs font-bold text-luxury-onyx dark:text-luxury-ivory mt-0.5">
                      {selectedAdvisor?.name}
                    </p>
                    <span className="text-[9px] text-luxury-onyx/50 dark:text-luxury-ivory/50 block">
                      {selectedAdvisor?.role}
                    </span>
                  </div>
                </div>

                {/* Free cost info */}
                <div className="p-3 bg-luxury-gold/5 rounded-lg border border-luxury-gold/15 flex justify-between items-center text-[10px] uppercase font-bold">
                  <span className="text-luxury-onyx/60 dark:text-luxury-ivory/60">Consultation Cost:</span>
                  <span className="text-luxury-gold">Complimentary</span>
                </div>
              </div>
            </div>

          </div>
        ) : (
          /* STEP 5: Success Certificate Screen */
          <div className="max-w-xl mx-auto p-8 bg-luxury-ivory-dark/20 dark:bg-luxury-onyx/40 border border-luxury-gold rounded-2xl shadow-2xl relative text-center space-y-6 overflow-hidden">
            {/* Soft gold radial flare */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-luxury-gold/5 rounded-full blur-2xl pointer-events-none" />
            
            <div className="flex justify-center">
              <div className="relative flex items-center justify-center w-16 h-16 border border-luxury-gold rounded-full bg-luxury-gold/10">
                <CheckCircle className="w-8 h-8 text-luxury-gold" />
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] tracking-[0.25em] font-sans text-luxury-gold uppercase font-bold">
                Boutique Confirmation
              </span>
              <h2 className="font-cinzel text-2xl font-extrabold text-luxury-onyx dark:text-luxury-ivory">
                Booking Secured
              </h2>
              <div className="w-12 h-[1px] bg-luxury-gold mx-auto mt-2" />
            </div>

            <div className="p-6 bg-luxury-ivory dark:bg-luxury-onyx-dark/80 rounded-xl border border-black/10 dark:border-white/10 text-left space-y-4 text-xs font-sans text-luxury-onyx/80 dark:text-luxury-ivory/80">
              <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
                <span className="font-bold text-luxury-gold-dark dark:text-luxury-gold-light">Client:</span>
                <span className="font-semibold text-luxury-onyx dark:text-luxury-ivory">{formData.name}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
                <span className="font-bold text-luxury-gold-dark dark:text-luxury-gold-light">Advisor:</span>
                <span className="font-semibold text-luxury-onyx dark:text-luxury-ivory">{selectedAdvisor.name}</span>
              </div>
              <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
                <span className="font-bold text-luxury-gold-dark dark:text-luxury-gold-light">Service:</span>
                <span className="font-semibold text-luxury-onyx dark:text-luxury-ivory uppercase tracking-wider">
                  {consultType === 'bespoke' ? 'Bespoke Customizer' : consultType === 'tour' ? 'Boutique Tour' : 'Gem Inspection'}
                </span>
              </div>
              <div className="flex justify-between border-b border-black/5 dark:border-white/5 pb-2">
                <span className="font-bold text-luxury-gold-dark dark:text-luxury-gold-light">Scheduled:</span>
                <span className="font-semibold text-luxury-onyx dark:text-luxury-ivory">
                  {selectedDate?.dayName}, {selectedDate?.month} {selectedDate?.dayNum} at {selectedSlot}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-luxury-gold-dark dark:text-luxury-gold-light">Meeting Access:</span>
                <span className="font-semibold text-luxury-gold font-mono text-[10px]">Secure Zoom Link Sent via Email</span>
              </div>
            </div>

            <p className="text-[10px] text-luxury-onyx/55 dark:text-luxury-ivory/55 max-w-sm mx-auto leading-relaxed">
              We look forward to introducing you to our collection. A digital calendar invite, GIA details, and secure conferencing codes have been forwarded to <span className="font-bold">{formData.email}</span>.
            </p>

            <button
              onClick={resetBooking}
              className="gold-gradient-button w-full py-3.5 rounded-lg text-xs uppercase tracking-widest font-semibold font-cinzel"
            >
              Book Another Appointment
            </button>
          </div>
        )}

      </div>
    </section>
  );
}
