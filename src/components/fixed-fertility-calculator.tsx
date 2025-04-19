import React, { useState, useEffect } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const FertilityCalculator = () => {
  const [fertilityRate, setFertilityRate] = useState(2.10);
  const [fertilityInput, setFertilityInput] = useState('2.10');
  const [generationYears, setGenerationYears] = useState(25);
  const [replacementPercent, setReplacementPercent] = useState('0%');
  const [isPositiveDeviation, setIsPositiveDeviation] = useState(false);
  const [populationData, setPopulationData] = useState<{ generation: string; population: number; width: number }[]>([]);
  const [populationChange, setPopulationChange] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [countries, setCountries] = useState<{ country: string; fertility: number; flag: string }[]>([]);
  const [viewMode, setViewMode] = useState('similar');
  const [chartType, setChartType] = useState('bar');

  // Country fertility data - updated with 2024 United Nations Population Bureau data
  const countryFertilityData = [
    { country: "Afghanistan", fertility: 4.12, flag: "🇦🇫" },
    { country: "Albania", fertility: 1.32, flag: "🇦🇱" },
    { country: "Algeria", fertility: 2.90, flag: "🇩🇿" },
    { country: "Angola", fertility: 5.40, flag: "🇦🇴" },
    { country: "Argentina", fertility: 2.20, flag: "🇦🇷" },
    { country: "Armenia", fertility: 1.60, flag: "🇦🇲" },
    { country: "Australia", fertility: 1.58, flag: "🇦🇺" },
    { country: "Austria", fertility: 1.49, flag: "🇦🇹" },
    { country: "Azerbaijan", fertility: 1.70, flag: "🇦🇿" },
    { country: "Bahamas", fertility: 1.75, flag: "🇧🇸" },
    { country: "Bahrain", fertility: 1.90, flag: "🇧🇭" },
    { country: "Bangladesh", fertility: 1.95, flag: "🇧🇩" },
    { country: "Barbados", fertility: 1.60, flag: "🇧🇧" },
    { country: "Belarus", fertility: 1.38, flag: "🇧🇾" },
    { country: "Belgium", fertility: 1.56, flag: "🇧🇪" },
    { country: "Belize", fertility: 2.25, flag: "🇧🇿" },
    { country: "Benin", fertility: 4.75, flag: "🇧🇯" },
    { country: "Bhutan", fertility: 1.90, flag: "🇧🇹" },
    { country: "Bolivia", fertility: 2.65, flag: "🇧🇴" },
    { country: "Bosnia and Herzegovina", fertility: 1.25, flag: "🇧🇦" },
    { country: "Botswana", fertility: 2.80, flag: "🇧🇼" },
    { country: "Brazil", fertility: 1.70, flag: "🇧🇷" },
    { country: "Brunei", fertility: 1.80, flag: "🇧🇳" },
    { country: "Bulgaria", fertility: 1.58, flag: "🇧🇬" },
    { country: "Burkina Faso", fertility: 5.10, flag: "🇧🇫" },
    { country: "Burundi", fertility: 5.30, flag: "🇧🇮" },
    { country: "Cambodia", fertility: 2.45, flag: "🇰🇭" },
    { country: "Cameroon", fertility: 4.50, flag: "🇨🇲" },
    { country: "Canada", fertility: 1.40, flag: "🇨🇦" },
    { country: "Cape Verde", fertility: 2.25, flag: "🇨🇻" },
    { country: "Central African Republic", fertility: 4.70, flag: "🇨🇫" },
    { country: "Chad", fertility: 5.65, flag: "🇹🇩" },
    { country: "Chile", fertility: 1.60, flag: "🇨🇱" },
    { country: "China", fertility: 1.18, flag: "🇨🇳" },
    { country: "Colombia", fertility: 1.75, flag: "🇨🇴" },
    { country: "Comoros", fertility: 4.15, flag: "🇰🇲" },
    { country: "Congo", fertility: 4.35, flag: "🇨🇬" },
    { country: "Costa Rica", fertility: 1.75, flag: "🇨🇷" },
    { country: "Croatia", fertility: 1.48, flag: "🇭🇷" },
    { country: "Cuba", fertility: 1.55, flag: "🇨🇺" },
    { country: "Cyprus", fertility: 1.32, flag: "🇨🇾" },
    { country: "Czech Republic", fertility: 1.71, flag: "🇨🇿" },
    { country: "Denmark", fertility: 1.67, flag: "🇩🇰" },
    { country: "Djibouti", fertility: 2.70, flag: "🇩🇯" },
    { country: "Dominican Republic", fertility: 2.30, flag: "🇩🇴" },
    { country: "DR Congo", fertility: 5.70, flag: "🇨🇩" },
    { country: "Ecuador", fertility: 2.05, flag: "🇪🇨" },
    { country: "Egypt", fertility: 3.25, flag: "🇪🇬" },
    { country: "El Salvador", fertility: 1.85, flag: "🇸🇻" },
    { country: "Equatorial Guinea", fertility: 4.40, flag: "🇬🇶" },
    { country: "Eritrea", fertility: 3.95, flag: "🇪🇷" },
    { country: "Estonia", fertility: 1.58, flag: "🇪🇪" },
    { country: "Eswatini", fertility: 2.95, flag: "🇸🇿" },
    { country: "Ethiopia", fertility: 4.10, flag: "🇪🇹" },
    { country: "Fiji", fertility: 2.75, flag: "🇫🇯" },
    { country: "Finland", fertility: 1.35, flag: "🇫🇮" },
    { country: "France", fertility: 1.83, flag: "🇫🇷" },
    { country: "Gabon", fertility: 3.85, flag: "🇬🇦" },
    { country: "Gambia", fertility: 5.15, flag: "🇬🇲" },
    { country: "Georgia", fertility: 1.98, flag: "🇬🇪" },
    { country: "Germany", fertility: 1.53, flag: "🇩🇪" },
    { country: "Ghana", fertility: 3.75, flag: "🇬🇭" },
    { country: "Greece", fertility: 1.35, flag: "🇬🇷" },
    { country: "Guatemala", fertility: 2.75, flag: "🇬🇹" },
    { country: "Guinea", fertility: 4.65, flag: "🇬🇳" },
    { country: "Guinea-Bissau", fertility: 4.40, flag: "🇬🇼" },
    { country: "Guyana", fertility: 2.45, flag: "🇬🇾" },
    { country: "Haiti", fertility: 2.85, flag: "🇭🇹" },
    { country: "Honduras", fertility: 2.35, flag: "🇭🇳" },
    { country: "Hungary", fertility: 1.55, flag: "🇭🇺" },
    { country: "Iceland", fertility: 1.72, flag: "🇮🇸" },
    { country: "India", fertility: 2.05, flag: "🇮🇳" },
    { country: "Indonesia", fertility: 2.25, flag: "🇮🇩" },
    { country: "Iran", fertility: 1.95, flag: "🇮🇷" },
    { country: "Iraq", fertility: 3.55, flag: "🇮🇶" },
    { country: "Ireland", fertility: 1.63, flag: "🇮🇪" },
    { country: "Israel", fertility: 2.90, flag: "🇮🇱" },
    { country: "Italy", fertility: 1.27, flag: "🇮🇹" },
    { country: "Ivory Coast", fertility: 4.55, flag: "🇨🇮" },
    { country: "Jamaica", fertility: 1.95, flag: "🇯🇲" },
    { country: "Japan", fertility: 1.30, flag: "🇯🇵" },
    { country: "Jordan", fertility: 2.65, flag: "🇯🇴" },
    { country: "Kazakhstan", fertility: 2.70, flag: "🇰🇿" },
    { country: "Kenya", fertility: 3.35, flag: "🇰🇪" },
    { country: "Kuwait", fertility: 2.10, flag: "🇰🇼" },
    { country: "Kyrgyzstan", fertility: 3.00, flag: "🇰🇬" },
    { country: "Laos", fertility: 2.60, flag: "🇱🇦" },
    { country: "Latvia", fertility: 1.55, flag: "🇱🇻" },
    { country: "Lebanon", fertility: 2.10, flag: "🇱🇧" },
    { country: "Lesotho", fertility: 3.10, flag: "🇱🇸" },
    { country: "Liberia", fertility: 4.25, flag: "🇱🇷" },
    { country: "Libya", fertility: 2.20, flag: "🇱🇾" },
    { country: "Lithuania", fertility: 1.47, flag: "🇱🇹" },
    { country: "Luxembourg", fertility: 1.37, flag: "🇱🇺" },
    { country: "Madagascar", fertility: 4.00, flag: "🇲🇬" },
    { country: "Malawi", fertility: 4.15, flag: "🇲🇼" },
    { country: "Malaysia", fertility: 1.97, flag: "🇲🇾" },
    { country: "Maldives", fertility: 1.80, flag: "🇲🇻" },
    { country: "Mali", fertility: 5.85, flag: "🇲🇱" },
    { country: "Malta", fertility: 1.20, flag: "🇲🇹" },
    { country: "Mauritania", fertility: 4.50, flag: "🇲🇷" },
    { country: "Mauritius", fertility: 1.40, flag: "🇲🇺" },
    { country: "Mexico", fertility: 1.90, flag: "🇲🇽" },
    { country: "Moldova", fertility: 1.30, flag: "🇲🇩" },
    { country: "Mongolia", fertility: 2.80, flag: "🇲🇳" },
    { country: "Montenegro", fertility: 1.75, flag: "🇲🇪" },
    { country: "Morocco", fertility: 2.30, flag: "🇲🇦" },
    { country: "Mozambique", fertility: 4.85, flag: "🇲🇿" },
    { country: "Myanmar", fertility: 2.10, flag: "🇲🇲" },
    { country: "Namibia", fertility: 3.30, flag: "🇳🇦" },
    { country: "Nepal", fertility: 1.85, flag: "🇳🇵" },
    { country: "Netherlands", fertility: 1.55, flag: "🇳🇱" },
    { country: "New Zealand", fertility: 1.63, flag: "🇳🇿" },
    { country: "Nicaragua", fertility: 2.35, flag: "🇳🇮" },
    { country: "Niger", fertility: 6.75, flag: "🇳🇪" },
    { country: "Nigeria", fertility: 5.20, flag: "🇳🇬" },
    { country: "North Korea", fertility: 1.90, flag: "🇰🇵" },
    { country: "North Macedonia", fertility: 1.50, flag: "🇲🇰" },
    { country: "Norway", fertility: 1.48, flag: "🇳🇴" },
    { country: "Oman", fertility: 2.80, flag: "🇴🇲" },
    { country: "Pakistan", fertility: 3.40, flag: "🇵🇰" },
    { country: "Palestine", fertility: 3.50, flag: "🇵🇸" },
    { country: "Panama", fertility: 2.40, flag: "🇵🇦" },
    { country: "Papua New Guinea", fertility: 3.50, flag: "🇵🇬" },
    { country: "Paraguay", fertility: 2.40, flag: "🇵🇾" },
    { country: "Peru", fertility: 2.20, flag: "🇵🇪" },
    { country: "Philippines", fertility: 2.85, flag: "🇵🇭" },
    { country: "Poland", fertility: 1.39, flag: "🇵🇱" },
    { country: "Portugal", fertility: 1.40, flag: "🇵🇹" },
    { country: "Qatar", fertility: 1.85, flag: "🇶🇦" },
    { country: "Romania", fertility: 1.80, flag: "🇷🇴" },
    { country: "Russia", fertility: 1.50, flag: "🇷🇺" },
    { country: "Rwanda", fertility: 3.95, flag: "🇷🇼" },
    { country: "Saudi Arabia", fertility: 2.25, flag: "🇸🇦" },
    { country: "Senegal", fertility: 4.50, flag: "🇸🇳" },
    { country: "Serbia", fertility: 1.50, flag: "🇷🇸" },
    { country: "Sierra Leone", fertility: 4.20, flag: "🇸🇱" },
    { country: "Singapore", fertility: 1.15, flag: "🇸🇬" },
    { country: "Slovakia", fertility: 1.57, flag: "🇸🇰" },
    { country: "Slovenia", fertility: 1.60, flag: "🇸🇮" },
    { country: "Somalia", fertility: 6.00, flag: "🇸🇴" },
    { country: "South Africa", fertility: 2.35, flag: "🇿🇦" },
    { country: "South Korea", fertility: 0.78, flag: "🇰🇷" },
    { country: "South Sudan", fertility: 4.70, flag: "🇸🇸" },
    { country: "Spain", fertility: 1.24, flag: "🇪🇸" },
    { country: "Sri Lanka", fertility: 2.10, flag: "🇱🇰" },
    { country: "Sudan", fertility: 4.35, flag: "🇸🇩" },
    { country: "Suriname", fertility: 2.35, flag: "🇸🇷" },
    { country: "Sweden", fertility: 1.67, flag: "🇸🇪" },
    { country: "Switzerland", fertility: 1.52, flag: "🇨🇭" },
    { country: "Syria", fertility: 2.80, flag: "🇸🇾" },
    { country: "Taiwan", fertility: 1.07, flag: "🇹🇼" },
    { country: "Tajikistan", fertility: 3.50, flag: "🇹🇯" },
    { country: "Tanzania", fertility: 4.80, flag: "🇹🇿" },
    { country: "Thailand", fertility: 1.50, flag: "🇹🇭" },
    { country: "Timor-Leste", fertility: 3.90, flag: "🇹🇱" },
    { country: "Togo", fertility: 4.30, flag: "🇹🇬" },
    { country: "Trinidad and Tobago", fertility: 1.70, flag: "🇹🇹" },
    { country: "Tunisia", fertility: 2.10, flag: "🇹🇳" },
    { country: "Turkey", fertility: 1.88, flag: "🇹🇷" },
    { country: "Turkmenistan", fertility: 2.70, flag: "🇹🇲" },
    { country: "Uganda", fertility: 4.95, flag: "🇺🇬" },
    { country: "Ukraine", fertility: 1.22, flag: "🇺🇦" },
    { country: "United Arab Emirates", fertility: 1.40, flag: "🇦🇪" },
    { country: "United Kingdom", fertility: 1.56, flag: "🇬🇧" },
    { country: "United States", fertility: 1.66, flag: "🇺🇸" },
    { country: "Uruguay", fertility: 1.90, flag: "🇺🇾" },
    { country: "Uzbekistan", fertility: 2.20, flag: "🇺🇿" },
    { country: "Venezuela", fertility: 2.20, flag: "🇻🇪" },
    { country: "Vietnam", fertility: 2.00, flag: "🇻🇳" },
    { country: "Yemen", fertility: 3.65, flag: "🇾🇪" },
    { country: "Zambia", fertility: 4.50, flag: "🇿🇲" },
    { country: "Zimbabwe", fertility: 3.50, flag: "🇿🇼" }
  ];

  const BASE_POPULATION = 100;
  const MAX_BAR_WIDTH = 65;

    // Calculate population projections
    const calculateProjections = () => {
      const numGenerations = 4;
      const generations = [];
      const replacementRate = 2.1;
      
      const deviation = (fertilityRate / replacementRate) - 1;
      const percentValue = (deviation * 100).toFixed(0);
      setReplacementPercent(`${percentValue}%`);
      setIsPositiveDeviation(deviation >= 0);
      
      let maxPopulation = BASE_POPULATION;
      let populations = [BASE_POPULATION];
      
      let currentPop = BASE_POPULATION;
      for (let i = 1; i <= numGenerations; i++) {
        const fertilityRateFactor = fertilityRate / 2.1;
        currentPop = Math.round(currentPop * fertilityRateFactor);
        populations.push(currentPop);
        if (currentPop > maxPopulation) {
          maxPopulation = currentPop;
        }
      }
      
      const finalPopulation = populations[populations.length - 1];
      const changePercent = ((finalPopulation - BASE_POPULATION) / BASE_POPULATION * 100).toFixed(0);
      
      if (parseFloat(changePercent) < 0) {
        setPopulationChange(`This country will lose ${Math.abs(parseFloat(changePercent))}% of their population in four generations.`);
      } else if (parseFloat(changePercent) > 0) {
        setPopulationChange(`This country will gain ${changePercent}% in population over four generations.`);
      } else {
        setPopulationChange(`This country will maintain its population over four generations.`);
      }
      
      const currentYear = new Date().getFullYear();
      
      generations.push({ 
        generation: currentYear.toString(), 
        population: populations[0], 
        width: (populations[0] / maxPopulation) * MAX_BAR_WIDTH
      });
      
      for (let i = 1; i <= numGenerations; i++) {
        generations.push({ 
          generation: (currentYear + (i * generationYears)).toString(), 
          population: populations[i], 
          width: (populations[i] / maxPopulation) * MAX_BAR_WIDTH
        });
      }
      
      setPopulationData(generations);
    };

  // Update countries list based on current fertility rate
  const updateCountriesList = (rate: number) => {
    if (viewMode === 'similar') {
      const similarCountries = countryFertilityData
        .filter(country => Math.abs(country.fertility - rate) < 0.05)
        .sort((a, b) => Math.abs(a.fertility - rate) - Math.abs(b.fertility - rate));
      setCountries(similarCountries);
    } else {
      let filteredCountries = countryFertilityData;
      if (searchTerm) {
        filteredCountries = countryFertilityData.filter(country => 
          country.country.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }
      setCountries(filteredCountries);
    }
  };

  useEffect(() => {
    calculateProjections();
    updateCountriesList(fertilityRate);
  }, [fertilityRate, generationYears, viewMode, searchTerm, calculateProjections, updateCountriesList]);

  // Handle input text changes for fertility rate
  const handleInputChange = (e: { target: { value: any; }; }) => {
    const value = e.target.value;
    
    if (/^(\d+)?\.?\d{0,2}$/.test(value) || value === '') {
      setFertilityInput(value);
      
      if (value !== '' && value !== '.') {
        const parsed = parseFloat(value);
        if (!isNaN(parsed) && parsed >= 0 && parsed <= 7) {
          setFertilityRate(parsed);
        }
      }
    }
  };

  // Format input when focus is lost
  const handleInputBlur = () => {
    if (fertilityInput === '' || fertilityInput === '.') {
      setFertilityInput('0.00');
      setFertilityRate(0);
    } else {
      const parsed = parseFloat(fertilityInput);
      setFertilityInput(parsed.toFixed(2));
    }
  };

  // Handle fertility rate changes from slider or buttons
  const handleFertilityChange = (value: number) => {
    const newValue = Math.max(0, Math.min(7, value));
    const formatted = newValue.toFixed(2);
    setFertilityRate(parseFloat(formatted));
    setFertilityInput(formatted);
  };

  // Handle generation years changes
  const handleYearsChange = (value: number) => {
    const newValue = Math.max(1, Math.min(50, value));
    setGenerationYears(newValue);
  };

  // Handle search functionality
  const handleSearch = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setSearchTerm(event.target.value);
  };

  // Handle view mode change
  const handleViewChange = (event: { target: { value: React.SetStateAction<string>; }; }) => {
    setViewMode(event.target.value);
    if (event.target.value === 'all') {
      setSearchTerm('');
    }
  };

  // Select a country and update fertility rate
  const selectCountry = (countryFertility: number) => {
    handleFertilityChange(countryFertility);
  };

  // Toggle chart type
  const toggleChartType = () => {
    setChartType(chartType === 'line' ? 'bar' : 'line');
  };
  
  // Get display text for chart toggle button
  const getChartToggleText = () => {
    return chartType === 'line' ? 'Switch to Bar View' : 'Switch to Line Chart';
  };

  const CountryItem = ({ country }: { country: { country: string; fertility: number; flag: string } }) => {
    return (
      <div 
        className="flex items-center bg-gray-100 px-3 py-2 rounded shadow-sm min-w-52 cursor-pointer hover:bg-gray-200 border border-gray-300"
        onClick={() => selectCountry(country.fertility)}
      >
        <div className="text-2xl mr-2">{country.flag}</div>
        <div className="font-bold">{country.country}</div>
        <div className="text-gray-600 ml-1.5">{country.fertility.toFixed(2)}</div>
      </div>
    );
  };

  // Render bar chart component
  const renderBarChart = () => {
    return (
      <div>
        {populationData.map((item, index) => (
          <div key={index} className="flex items-center mb-3 relative">
            <div className="w-20 text-right pr-4 text-xl font-bold">{item.generation}</div>
            <div className="flex-1 h-10 relative overflow-hidden">
              <div 
                className={`h-10 ${fertilityRate >= 2.1 ? 'bg-green-500' : 'bg-red-500'} absolute left-0`}
                style={{ width: `${item.width}%` }}
              ></div>
              <div className="absolute h-10 flex items-center" style={{ left: `${Math.min(item.width + 1, 90)}%` }}>
                <span className="font-bold text-xl">{item.population.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Render line chart component
  const renderLineChart = () => {
    return (
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={populationData}
            margin={{top: 5, right: 30, left: 20, bottom: 5}}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="generation" />
            <YAxis />
            <Tooltip formatter={(value) => value.toLocaleString()} labelFormatter={(label) => `Year: ${label}`} />
            <Line 
              type="monotone" 
              dataKey="population" 
              stroke={fertilityRate >= 2.1 ? '#22c55e' : '#ef4444'} 
              strokeWidth={4} 
              dot={{ r: 6 }} 
              activeDot={{ r: 8 }} 
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="border-2 border-black p-6">
        <h1 className="text-4xl font-bold text-center mb-8">Total Fertility Rate Calculator</h1>
        
        <div className="flex items-center mb-4">
          <div className="w-1/4 text-right pr-4 text-lg font-bold">Fertility Rate</div>
          <div className="w-20 h-10 bg-yellow-200 border border-black text-center flex items-center justify-center text-xl">
            <input 
              type="text" 
              className="w-full h-full bg-transparent text-center outline-none"
              value={fertilityInput}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
            />
          </div>
          <div className="flex-1 flex items-center px-2">
            <button 
              className="w-8 h-8 bg-gray-200 border border-gray-400 flex items-center justify-center font-bold"
              onClick={() => handleFertilityChange(fertilityRate - 0.01)}
            >
              ◄
            </button>
            <input 
              type="range" 
              className="flex-1 mx-2"
              min="0" 
              max="7" 
              step="0.01"
              value={fertilityRate}
              onChange={(e) => handleFertilityChange(parseFloat(e.target.value))}
            />
            <button 
              className="w-8 h-8 bg-gray-200 border border-gray-400 flex items-center justify-center font-bold"
              onClick={() => handleFertilityChange(fertilityRate + 0.01)}
            >
              ►
            </button>
          </div>
        </div>
        
        <div className="flex items-center mb-6">
          <div className="w-1/4 text-right pr-4 text-lg font-bold">Generation Years</div>
          <div className="w-20 h-10 bg-yellow-200 border border-black text-center flex items-center justify-center text-xl">
            <input 
              type="number" 
              className="w-full h-full bg-transparent text-center outline-none"
              value={generationYears}
              min="1" 
              max="50" 
              step="1"
              onChange={(e) => handleYearsChange(parseInt(e.target.value))}
            />
          </div>
          <div className="flex-1 flex items-center justify-end">
            <div className={`text-xl font-bold ${isPositiveDeviation ? 'text-green-600' : 'text-red-600'}`}>
              {replacementPercent} {isPositiveDeviation ? 'Above replacement' : 'Below replacement'}
            </div>
          </div>
        </div>
        
        <div className="mt-4 text-base italic">
          Starting with a current population of 100
        </div>
        <div className="mt-1 text-base font-semibold">
          {populationChange}
        </div>
        
        <div className="mt-6 mb-6">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold mb-2">Population Trend</h2>
            <button
              className="px-4 py-2 bg-gray-200 border border-gray-400 rounded hover:bg-gray-300"
              onClick={toggleChartType}
            >
              {getChartToggleText()}
            </button>
          </div>
          <div className="w-full">
            {chartType === 'line' ? renderLineChart() : renderBarChart()}
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-300">
          <div className="flex justify-between items-center mb-3">
            <div className="font-bold text-lg">Countries by Fertility Rate</div>
            <div className="flex items-center">
              <select 
                className="px-2 py-1 border border-gray-300 rounded bg-gray-100"
                value={viewMode}
                onChange={handleViewChange}
              >
                <option value="similar">Show Similar Countries</option>
                <option value="all">Show All Countries</option>
              </select>
            </div>
          </div>
          
          {viewMode === 'all' && (
            <div className="flex items-center mb-3">
              <span className="mr-2">Search:</span>
              <input 
                type="text" 
                className="px-2 py-1 border border-gray-300 rounded w-52"
                placeholder="Type to filter countries..."
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          )}
          
          <div className="flex flex-wrap gap-3 max-h-72 overflow-y-auto p-2 border border-gray-200 rounded">
            {countries.map((country, index) => (
              <CountryItem key={index} country={country} />
            ))}
          </div>
        </div>
        
        <div className="mt-5 flex justify-between items-center text-sm">
          <div>Source: UN Population Fund</div>
          <div>Superabundance™</div>
        </div>
      </div>
    </div>
  );
};

export default FertilityCalculator;