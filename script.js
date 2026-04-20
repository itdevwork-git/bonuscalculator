<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MINI Garage Work Distribution</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            background-color: #f3f4f6;
            font-family: 'Inter', sans-serif;
        }
        .card {
            background: white;
            border-radius: 12px;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
        }
        .scroll-thin::-webkit-scrollbar {
            width: 6px;
        }
        .scroll-thin::-webkit-scrollbar-track {
            background: #f1f1f1;
        }
        .scroll-thin::-webkit-scrollbar-thumb {
            background: #d1d5db;
            border-radius: 10px;
        }
    </style>
</head>
<body class="p-4 md:p-8">
    <div class="max-w-6xl mx-auto">
        <header class="mb-8 text-center">
            <h1 class="text-3xl font-bold text-gray-900">Work Distribution Breakdown</h1>
            <p class="text-gray-600 mt-2">Team effort percentages and task complexity weighting</p>
        </header>

        <div class="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            <!-- Left Column: Controls & Legend -->
            <div class="lg:col-span-4 space-y-6">
                <!-- Project Selection -->
                <div class="card p-6">
                    <label class="block text-sm font-bold text-gray-700 mb-2 uppercase tracking-wider">Project / Dealer</label>
                    <select id="dealerSelect" class="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 outline-none">
                        <option value="all">All Projects (Average)</option>
                        <!-- Other options populated by JS -->
                    </select>
                    <div class="mt-4 p-4 bg-blue-50 border-l-4 border-blue-500">
                        <h3 class="font-bold text-blue-800 text-xs uppercase">Lead Info</h3>
                        <p id="topContributor" class="text-blue-700 text-sm mt-1 font-medium italic">Loading...</p>
                    </div>
                </div>

                <!-- Scoring Legend -->
                <div class="card p-6">
                    <h2 class="text-lg font-bold text-gray-800 mb-4 border-b pb-2">Scoring Legend</h2>
                    <div class="text-xs text-gray-500 mb-4 italic">
                        Percentages are weighted based on the following task complexities:
                    </div>
                    <div class="max-height-[400px] overflow-y-auto scroll-thin pr-2 space-y-2" style="max-height: 400px;">
                        <div id="taskLegend" class="space-y-1.5">
                            <!-- Tasks populated by JS -->
                        </div>
                    </div>
                    
                    <div class="mt-6 pt-4 border-t border-gray-100">
                        <h4 class="text-xs font-bold text-gray-700 uppercase mb-2">Complexity Weighting</h4>
                        <div class="grid grid-cols-2 gap-2 text-[10px]">
                            <div class="flex items-center justify-between p-1.5 bg-gray-50 rounded">
                                <span class="font-bold text-blue-600">Hard</span>
                                <span class="bg-blue-100 px-1 rounded">4 pts</span>
                            </div>
                            <div class="flex items-center justify-between p-1.5 bg-gray-50 rounded">
                                <span class="font-bold text-green-600">Medium</span>
                                <span class="bg-green-100 px-1 rounded">3 pts</span>
                            </div>
                            <div class="flex items-center justify-between p-1.5 bg-gray-50 rounded">
                                <span class="font-bold text-yellow-600">Easy</span>
                                <span class="bg-yellow-100 px-1 rounded">2 pts</span>
                            </div>
                            <div class="flex items-center justify-between p-1.5 bg-gray-50 rounded">
                                <span class="font-bold text-gray-600">V. Easy</span>
                                <span class="bg-gray-100 px-1 rounded">1 pt</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Right Column: Effort Breakdown -->
            <div class="lg:col-span-8">
                <div class="card p-6 min-h-full">
                    <div class="flex justify-between items-center mb-8">
                        <h2 class="text-2xl font-bold text-gray-800">Effort Breakdown</h2>
                        <span class="text-xs font-bold px-3 py-1 bg-gray-800 rounded-full text-white uppercase tracking-widest">Weighting Active</span>
                    </div>
                    
                    <div id="resultsTable" class="space-y-8">
                        <!-- Progress bars populated by JS -->
                    </div>

                    <div class="mt-12 p-6 bg-gray-50 rounded-xl border border-dashed border-gray-300">
                        <h3 class="text-sm font-bold text-gray-700 mb-2">How these scores are generated:</h3>
                        <p class="text-xs text-gray-600 leading-relaxed">
                            Individual workload percentages are calculated by aggregating the complexity points of every task assigned to a team member. Tasks marked as <strong>Hard</strong> contribute 4x more weighting than <strong>Very Easy</strong> tasks. The final percentage reflects each person's relative contribution to the total complexity points of the project.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <script>
        // Complexity Task List
        const taskData = [
            { task: "Alice set up", complexity: "Medium", points: 3 },
            { task: "Template Zero Content Pages", complexity: "Hard", points: 4 },
            { task: "Template Zero - Model page", complexity: "Hard", points: 4 },
            { task: "Template Zero Duplication", complexity: "Hard", points: 4 },
            { task: "QC Check (Phase 1)", complexity: "Medium", points: 3 },
            { task: "QC Check (Phase 2)", complexity: "Medium", points: 3 },
            { task: "Google Tag Manager/GTM ID", complexity: "Very Easy", points: 1 },
            { task: "Shopping Menu Added", complexity: "Very Easy", points: 1 },
            { task: "Accessories Page Creation", complexity: "Hard", points: 4 },
            { task: "Mini Wheels & Tyres", complexity: "Hard", points: 4 },
            { task: "Privacy Policy Update", complexity: "Easy", points: 2 },
            { task: "Meet The Team Pages", complexity: "Easy", points: 2 },
            { task: "Fix Garage Sale Event", complexity: "Medium", points: 3 },
            { task: "Home Page Banners", complexity: "Easy", points: 2 },
            { task: "Mini URL Redirects", complexity: "Easy", points: 2 },
            { task: "NZ Finance and Subpages", complexity: "Hard", points: 4 },
            { task: "Offers URL's", complexity: "Easy", points: 2 },
            { task: "Stock Locator URL", complexity: "Easy", points: 2 },
            { task: "Models API Assistance", complexity: "Medium", points: 3 },
            { task: "Build Check", complexity: "Medium", points: 3 },
            { task: "Self-Live Check", complexity: "Medium", points: 3 },
            { task: "Pre-Live Check", complexity: "Medium", points: 3 },
            { task: "Fix Google Maps location", complexity: "Medium", points: 3 },
            { task: "Image Resized (Team page)", complexity: "Easy", points: 2 },
            { task: "CI Revisions 1.0", complexity: "Easy", points: 2 },
            { task: "NZ Service Tool", complexity: "Medium", points: 3 },
            { task: "eBrochure Form Requirement", complexity: "Medium", points: 3 },
            { task: "Landing Page: Skeg", complexity: "Medium", points: 3 },
            { task: "Landing Page: Machina", complexity: "Medium", points: 3 },
            { task: "Landing Page: Deus Ex Machina", complexity: "Medium", points: 3 },
            { task: "Landing Page: Victory Edition", complexity: "Medium", points: 3 }
        ];

        // Dealer Effort Data
        const dealerData = [
            { name: "Adelaide MINI Garage", rodel: 44.66, marge: 30.88, kent: 6.22, rowell: 2.43, paolo: 15.81, michael: 0.00, top: "Rodel - 44.66%" },
            { name: "Auto Classic MINI Garage", rodel: 29.42, marge: 36.95, kent: 8.83, rowell: 2.34, paolo: 22.47, michael: 0.00, top: "Marge - 36.95%" },
            { name: "Berwick MINI Garage", rodel: 31.56, marge: 36.95, kent: 19.10, rowell: 2.14, paolo: 9.96, michael: 0.29, top: "Marge - 36.95%" },
            { name: "Brighton MINI Garage", rodel: 26.63, marge: 49.15, kent: 11.24, rowell: 2.11, paolo: 10.59, michael: 0.29, top: "Marge - 49.15%" },
            { name: "Brisbane MINI Garage", rodel: 43.88, marge: 31.43, kent: 11.07, rowell: 4.06, paolo: 9.55, michael: 0.00, top: "Rodel - 43.88%" },
            { name: "Canberra MINI Garage", rodel: 31.82, marge: 31.13, kent: 24.77, rowell: 3.10, paolo: 9.18, michael: 0.00, top: "Rodel - 31.82%" },
            { name: "Canterbury MINI Garage", rodel: 39.34, marge: 35.05, kent: 9.38, rowell: 4.17, paolo: 12.06, michael: 0.00, top: "Rodel - 39.34%" },
            { name: "Coastline MINI Garage", rodel: 25.05, marge: 35.05, kent: 23.66, rowell: 4.17, paolo: 12.06, michael: 0.00, top: "Marge - 35.05%" },
            { name: "Doncaster MINI Garage", rodel: 25.05, marge: 35.48, kent: 22.80, rowell: 4.17, paolo: 12.50, michael: 0.00, top: "Marge - 35.48%" },
            { name: "Essendon MINI Garage", rodel: 30.33, marge: 35.75, kent: 8.27, rowell: 2.75, paolo: 22.61, michael: 0.28, top: "Marge - 35.75%" },
            { name: "Geelong MINI Garage", rodel: 33.45, marge: 29.13, kent: 9.05, rowell: 16.39, paolo: 11.70, michael: 0.28, top: "Rodel - 33.45%" },
            { name: "Glenelg MINI Garage", rodel: 34.68, marge: 34.45, kent: 15.28, rowell: 3.47, paolo: 11.83, michael: 0.28, top: "Rodel - 34.68%" },
            { name: "Parramatta MINI Garage", rodel: 45.92, marge: 25.35, kent: 9.83, rowell: 3.33, paolo: 15.06, michael: 0.50, top: "Rodel - 45.92%" },
            { name: "Sydney MINI Garage", rodel: 25.90, marge: 37.00, kent: 9.16, rowell: 2.73, paolo: 24.12, michael: 1.08, top: "Marge - 37.00%" },
            { name: "Waverley MINI Garage", rodel: 40.20, marge: 24.12, kent: 8.81, rowell: 2.63, paolo: 23.20, michael: 1.04, top: "Rodel - 40.20%" },
            { name: "Auckland MINI Garage", rodel: 39.25, marge: 20.97, kent: 15.11, rowell: 2.41, paolo: 21.30, michael: 0.96, top: "Rodel - 39.25%" },
            { name: "Wellington MINI Garage", rodel: 42.90, marge: 29.66, kent: 7.15, rowell: 2.32, paolo: 17.72, michael: 0.25, top: "Rodel - 42.90%" }
        ];

        const standardStats = { rodel: 36.09, marge: 28.78, kent: 12.02, rowell: 4.08, paolo: 18.42, michael: 0.61, top: "Rodel - 36.09%" };
        const otherDealers = [
            "Gold Coast MINI Garage", "Hobart MINI Garage", "Launceston MINI Garage", 
            "Melbourne MINI Garage", "Motorline MINI Garage", "Newcastle MINI Garage", 
            "North Shore MINI Garage", "Shepparton MINI Garage", "Townsville MINI Garage", 
            "Worthington MINI Garage", "Christchurch MINI Garage", "Cooke Howlison MINI Garage", 
            "Coombes Johnston MINI Garage", "East Auckland MINI Garage", "Hawkes Bay MINI Garage"
        ];

        otherDealers.forEach(name => {
            dealerData.push({ name, ...standardStats });
        });

        const calculateGlobalAverages = () => {
            const count = dealerData.length;
            const avg = { name: "All Projects (Average)", rodel: 0, marge: 0, kent: 0, rowell: 0, paolo: 0, michael: 0 };
            dealerData.forEach(d => {
                avg.rodel += d.rodel;
                avg.marge += d.marge;
                avg.kent += d.kent;
                avg.rowell += d.rowell;
                avg.paolo += d.paolo;
                avg.michael += d.michael;
            });
            avg.rodel = (avg.rodel / count).toFixed(2);
            avg.marge = (avg.marge / count).toFixed(2);
            avg.kent = (avg.kent / count).toFixed(2);
            avg.rowell = (avg.rowell / count).toFixed(2);
            avg.paolo = (avg.paolo / count).toFixed(2);
            avg.michael = (avg.michael / count).toFixed(2);
            avg.top = "Rodel (Overall Lead)";
            return avg;
        };

        const globalAvg = calculateGlobalAverages();
        dealerData.sort((a, b) => a.name.localeCompare(b.name));

        const dealerSelect = document.getElementById('dealerSelect');
        const resultsTable = document.getElementById('resultsTable');
        const taskLegend = document.getElementById('taskLegend');
        const topContributorDisplay = document.getElementById('topContributor');

        // Populate Legend
        taskData.forEach(t => {
            const colorClass = t.complexity === 'Hard' ? 'text-blue-600' : 
                               t.complexity === 'Medium' ? 'text-green-600' : 
                               t.complexity === 'Easy' ? 'text-yellow-600' : 'text-gray-500';
            
            const div = document.createElement('div');
            div.className = "flex justify-between items-center text-[11px] p-1 border-b border-gray-50 last:border-0";
            div.innerHTML = `
                <span class="text-gray-700 truncate mr-2">${t.task}</span>
                <span class="font-bold ${colorClass} whitespace-nowrap">${t.complexity}</span>
            `;
            taskLegend.appendChild(div);
        });

        // Populate Dropdown
        dealerData.forEach((dealer, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = dealer.name;
            dealerSelect.appendChild(option);
        });

        function render() {
            const dealer = dealerSelect.value === "all" ? globalAvg : dealerData[dealerSelect.value];
            topContributorDisplay.textContent = `Top: ${dealer.top}`;
            
            const members = [
                { name: 'Rodel', pct: parseFloat(dealer.rodel), color: 'bg-blue-600' },
                { name: 'Marge', pct: parseFloat(dealer.marge), color: 'bg-emerald-600' },
                { name: 'Paolo', pct: parseFloat(dealer.paolo), color: 'bg-amber-600' },
                { name: 'Kent', pct: parseFloat(dealer.kent), color: 'bg-purple-600' },
                { name: 'Rowell', pct: parseFloat(dealer.rowell), color: 'bg-indigo-600' },
                { name: 'Michael', pct: parseFloat(dealer.michael), color: 'bg-slate-500' }
            ];

            resultsTable.innerHTML = '';
            members.forEach(m => {
                const row = document.createElement('div');
                row.className = "flex flex-col space-y-2";
                row.innerHTML = `
                    <div class="flex justify-between items-end">
                        <div class="flex items-center space-x-2">
                             <div class="w-3 h-3 rounded-full ${m.color}"></div>
                             <span class="font-black text-gray-800 tracking-wide">${m.name.toUpperCase()}</span>
                        </div>
                        <span class="font-black text-2xl text-gray-900">${m.pct.toFixed(2)}<span class="text-xs font-normal text-gray-400 ml-1">%</span></span>
                    </div>
                    <div class="w-full bg-gray-100 rounded-full h-4 overflow-hidden shadow-inner">
                        <div class="${m.color} h-full transition-all duration-1000 ease-out relative" style="width: ${m.pct}%">
                            <div class="absolute inset-0 bg-white opacity-10 animate-pulse"></div>
                        </div>
                    </div>
                `;
                resultsTable.appendChild(row);
            });
        }

        dealerSelect.addEventListener('change', render);
        render();
    </script>
</body>
</html>
