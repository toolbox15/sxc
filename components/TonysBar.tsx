// ... (Keep all imports and helper components same)

const BearsTheme: React.FC<{ ads?: AdItem[] }> = ({ ads = [] }) => {
  // ... (Keep data filtering logic same)

  return (
    <div className="w-full h-screen relative overflow-hidden bg-cover bg-center font-sans" style={{ backgroundImage: "url('/field-bg.png')" }}>
      {gameActive && <div className="absolute inset-0 z-[200] flex items-center justify-center bg-black/90 backdrop-blur-md"><SlotMachine triggerSpin={true} /></div>}
      {alertAd && !gameActive && <FlashSaleOverlay item={alertAd} />}
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/20 via-blue-950/10 to-blue-950/20 z-0"></div>
      <StadiumFlashEffect />
      <RunningPlayer />

      {/* --- DECORATIVE ASSETS --- */}
      <div className="absolute bottom-[-30px] left-[5%] z-10">
          <div className="absolute bottom-[40px] left-[50px] w-[150px] h-[30px] bg-black/60 blur-xl rounded-full pointer-events-none"></div>
          <BubblesEffect />
          <img src="/beer-glass.png" alt="Beer Glass" className="h-[350px] w-auto drop-shadow-2xl" />
      </div>

      <div className="absolute bottom-[10px] right-[20px] z-10">
        <div className="absolute bottom-[15px] left-[20px] w-[120px] h-[25px] bg-black/60 blur-xl rounded-full pointer-events-none"></div>
        <motion.img src="/football.png" className="h-[250px] w-auto drop-shadow-2xl" animate={{ scale: [1, 1.02, 1] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />
      </div>

      {/* --- CONTENT GRID --- */}
      <div className="relative z-20 w-full h-full grid grid-cols-12 gap-6 p-12">
        {/* Main Header: Bumped to 61px */}
        <div className="col-span-12 text-center mb-4 border-b-4 border-orange-600 pb-4">
          <h1 className="text-[61px] font-black uppercase tracking-tighter text-white italic drop-shadow-[0_5px_5px_rgba(0,0,0,0.9)]">
            Game Day <span className="text-orange-500">Specials</span>
          </h1>
        </div>

        {/* Kickoff Column */}
        <div className="col-span-4 pl-48 pt-4"> 
            <div className="bg-orange-600/30 border-l-4 border-orange-500 p-3 mb-4 rounded-r-lg flex items-center gap-3 backdrop-blur-sm">
              <Flame className="text-orange-500 w-8 h-8" />
              <h2 className="text-[31px] font-black text-white uppercase italic drop-shadow-md">Kickoff</h2>
            </div>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5">
              {kickoff.map((item, i) => (
                <motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-600/50 pb-2">
                  <div className="flex justify-between items-end w-full">
                    <div className="flex items-center gap-2">
                      <Flame className="text-orange-600 w-5 h-5" />
                      <h3 className="text-[21px] font-bold text-white uppercase drop-shadow-md">{item.Title}</h3>
                    </div>
                    <span className="text-[25px] font-black text-orange-500 drop-shadow-md">{item.Price}</span>
                  </div>
                  {item.Description && <p className="text-slate-100 text-[13px] font-bold ml-7 drop-shadow-sm">{item.Description}</p>}
                </motion.div>
              ))}
            </motion.div>
        </div>

        {/* Main Event Column */}
        <div className="col-span-4 pt-4 px-6">
          <div className="bg-blue-950/40 border-l-4 border-white p-3 mb-4 rounded-r-lg flex items-center gap-3 backdrop-blur-sm">
            <UtensilsCrossed className="text-white w-8 h-8" />
            <h2 className="text-[31px] font-black text-white uppercase italic drop-shadow-md">The Main Event</h2>
          </div>
          <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-6">
            {mains.map((item, i) => (
              <motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-600/50 pb-2">
                <div className="flex justify-between items-end w-full">
                  <div className="flex items-center gap-2">
                    <UtensilsCrossed className="text-orange-600 w-6 h-6" />
                    <h3 className="text-[25px] font-bold text-white uppercase drop-shadow-md">{item.Title}</h3>
                  </div>
                  <span className="text-[31px] font-black text-orange-500 drop-shadow-md">{item.Price}</span>
                </div>
                {item.Description && <p className="text-slate-100 text-[15px] font-bold ml-8 drop-shadow-sm">{item.Description}</p>}
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Draft Picks Column */}
        <div className="col-span-4 pr-32 pt-4"> 
            <div className="bg-orange-600/30 border-r-4 border-orange-500 p-3 mb-4 rounded-l-lg text-right flex items-center justify-end gap-3 backdrop-blur-sm">
              <h2 className="text-[31px] font-black text-white uppercase italic drop-shadow-md">Draft Picks</h2>
              <Beer className="text-orange-500 w-8 h-8" />
            </div>
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="flex flex-col gap-5 pb-32">
              {drinks.map((item, i) => (
                <motion.div key={i} variants={itemVariants} className="flex flex-col border-b border-slate-600/50 pb-2">
                  <div className="flex justify-between items-end w-full">
                    <div className="flex items-center gap-2">
                      <Beer className="text-orange-600 w-5 h-5" />
                      <h3 className="text-[21px] font-bold text-white uppercase drop-shadow-md">{item.Title}</h3>
                    </div>
                    <span className="text-[25px] font-black text-orange-500 drop-shadow-md">{item.Price}</span>
                  </div>
                  {item.Description && <p className="text-slate-100 text-[13px] font-bold text-right drop-shadow-sm">{item.Description}</p>}
                </motion.div>
              ))}
            </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BearsTheme;
