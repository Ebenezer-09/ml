"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  ChartBarIcon,
  FileTextIcon,
  EyeIcon,
  CogIcon,
  BeakerIcon,
  LineChartIcon,
  CheckCircleIcon,
  PlayIcon,
  CpuIcon,
  SparklesIcon,
  ArrowRightIcon,
  ChartPieIcon,
  ClockIcon,
  TrophyIcon,
} from "lucide-react";

// Define interfaces for type safety
interface Performance {
  r2: number;
  rmse: number;
  mae: number;
  time: number;
}

type SectionId = "introduction" | "apercu" | "analyse" | "entrainement" | "comparatif" | "conclusion";

interface NavigationItem {
  id: SectionId;
  label: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  color: string;
}

const Dashboard = () => {
  const [activeSection, setActiveSection] = useState<SectionId>("introduction");
  const [isLoading, setIsLoading] = useState(false);
  type ModelName = keyof typeof modelPerformance;
  const [modelResults, setModelResults] = useState<Partial<Record<ModelName, Performance>>>({});

  // Simulated dataset info
  const datasetInfo = {
    rows: 5000,
    columns: 7,
    features: ["profondeur", "ph", "conductivite", "distance_faille", "humidite", "type_roche"],
    target: "teneur_or",
    missingValues: 0,
  };

  // Model performance data
  const modelPerformance: Record<string, Performance> = {
    "Régression Linéaire": { r2: 0.9272, rmse: 1.68, mae: 1.27, time: 0.12 },
    "Forêt Aléatoire": { r2: 0.9802, rmse: 0.87, mae: 0.64, time: 2.45 },
    MLPRegressor: { r2: 0.9979, rmse: 0.28, mae: 0.22, time: 8.32 },
    XGBoost: { r2: 0.989, rmse: 0.65, mae: 0.52, time: 3.21 },
  };

  // Navigation items
  const navigationItems: NavigationItem[] = [
    { id: "introduction", label: "Introduction", icon: FileTextIcon, color: "from-blue-500 to-cyan-500" },
    { id: "apercu", label: "Aperçu Dataset", icon: EyeIcon, color: "from-green-500 to-emerald-500" },
    { id: "analyse", label: "Analyse Préliminaire", icon: ChartBarIcon, color: "from-purple-500 to-violet-500" },
    { id: "entrainement", label: "Entraînement Modèles", icon: CogIcon, color: "from-orange-500 to-red-500" },
    { id: "comparatif", label: "Étude Comparative", icon: LineChartIcon, color: "from-pink-500 to-rose-500" },
    { id: "conclusion", label: "Conclusion", icon: CheckCircleIcon, color: "from-indigo-500 to-blue-500" },
  ];

  // Simulate model training
  const trainModel = (modelName: ModelName) => {
    setIsLoading(true);
    setTimeout(() => {
      setModelResults((prev) => ({
        ...prev,
        [modelName]: modelPerformance[modelName],
      }));
      setIsLoading(false);
    }, 2000);
  };

  const renderContent = () => {
    switch (activeSection) {
      case "introduction":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8 border border-blue-100 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl">
                  <SparklesIcon className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                  Analyse Prédictive des Données Minières
                </h1>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">Objectif du Projet</h2>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    Ce dashboard présente une analyse complète des données minières pour prédire la teneur en or en
                    utilisant différents algorithmes d'apprentissage automatique. Notre approche compare les performances
                    de quatre modèles distincts.
                  </p>

                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Machine Learning", "Géologie", "Prédiction", "Big Data"].map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Modèles Étudiés</h3>
                  <div className="space-y-3">
                    {Object.keys(modelPerformance).map((model) => (
                      <div key={model} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                        <span className="text-gray-700 dark:text-gray-300">{model}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {[
                { title: "Données", value: "5,000", subtitle: "échantillons miniers", icon: ChartPieIcon },
                { title: "Variables", value: "7", subtitle: "caractéristiques", icon: CpuIcon },
                { title: "Modèles", value: "4", subtitle: "algorithmes testés", icon: BeakerIcon },
              ].map((stat, index) => (
                <div
                  key={index}
                  className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-3xl font-bold text-gray-800 dark:text-white">{stat.value}</p>
                      <p className="text-gray-600 dark:text-gray-400">{stat.subtitle}</p>
                    </div>
                    <stat.icon className="h-12 w-12 text-blue-500" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "apercu":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mb-6">
                Aperçu du Dataset
              </h1>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {[
                  { label: "Observations", value: datasetInfo.rows.toLocaleString(), color: "from-green-500 to-emerald-500" },
                  { label: "Variables", value: datasetInfo.columns, color: "from-blue-500 to-cyan-500" },
                  { label: "Valeurs Manquantes", value: datasetInfo.missingValues, color: "from-orange-500 to-red-500" },
                  {
                    label: "Complétude",
                    value: `${((1 - datasetInfo.missingValues / (datasetInfo.rows * datasetInfo.columns)) * 100).toFixed(1)}%`,
                    color: "from-purple-500 to-violet-500",
                  },
                ].map((item, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                    <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">{item.label}</h3>
                    <p className={`text-3xl font-bold bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}>
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Structure des Données</h2>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200 dark:border-gray-700">
                        <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-white">Variable</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-white">Type</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-white">Description</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-800 dark:text-white">Rôle</th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { name: "profondeur", type: "Numérique", desc: "Profondeur d'extraction (m)", role: "Feature" },
                        { name: "ph", type: "Numérique", desc: "Niveau de pH du sol", role: "Feature" },
                        { name: "conductivite", type: "Numérique", desc: "Conductivité électrique", role: "Feature" },
                        { name: "distance_faille", type: "Numérique", desc: "Distance à la faille (km)", role: "Feature" },
                        { name: "humidite", type: "Numérique", desc: "Taux d'humidité (%)", role: "Feature" },
                        { name: "type_roche", type: "Catégoriel", desc: "Type de formation rocheuse", role: "Feature" },
                        { name: "teneur_or", type: "Numérique", desc: "Concentration en or (g/t)", role: "Target" },
                      ].map((row, index) => (
                        <tr
                          key={index}
                          className="border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                        >
                          <td className="py-3 px-4 font-medium text-gray-800 dark:text-white">{row.name}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                row.type === "Numérique"
                                  ? "bg-blue-100 text-blue-800"
                                  : "bg-green-100 text-green-800"
                              }`}
                            >
                              {row.type}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-gray-600 dark:text-gray-300">{row.desc}</td>
                          <td className="py-3 px-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                row.role === "Target" ? "bg-red-100 text-red-800" : "bg-gray-100 text-gray-800"
                              }`}
                            >
                              {row.role}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* Aperçu des premières lignes du dataset */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mt-8">
                <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">
                  Aperçu des premières lignes du dataset
                </h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-xs md:text-sm text-left">
                    <thead>
                      <tr className="bg-blue-100 dark:bg-blue-900/30">
                        <th className="py-2 px-3 font-semibold">profondeur</th>
                        <th className="py-2 px-3 font-semibold">type_roche</th>
                        <th className="py-2 px-3 font-semibold">ph</th>
                        <th className="py-2 px-3 font-semibold">conductivite</th>
                        <th className="py-2 px-3 font-semibold">distance_faille</th>
                        <th className="py-2 px-3 font-semibold">humidite</th>
                        <th className="py-2 px-3 font-semibold">teneur_or</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="py-2 px-3">32.64</td>
                        <td className="py-2 px-3">Basalte</td>
                        <td className="py-2 px-3">6.02</td>
                        <td className="py-2 px-3">445.39</td>
                        <td className="py-2 px-3">892.75</td>
                        <td className="py-2 px-3">28.01</td>
                        <td className="py-2 px-3">2.7</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">294.0</td>
                        <td className="py-2 px-3">Granit</td>
                        <td className="py-2 px-3">5.51</td>
                        <td className="py-2 px-3">495.45</td>
                        <td className="py-2 px-3">276.99</td>
                        <td className="py-2 px-3">25.43</td>
                        <td className="py-2 px-3">17.96</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">457.18</td>
                        <td className="py-2 px-3">Schiste</td>
                        <td className="py-2 px-3">6.12</td>
                        <td className="py-2 px-3">288.61</td>
                        <td className="py-2 px-3">242.14</td>
                        <td className="py-2 px-3">18.71</td>
                        <td className="py-2 px-3">13.45</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">96.9</td>
                        <td className="py-2 px-3">Schiste</td>
                        <td className="py-2 px-3">5.54</td>
                        <td className="py-2 px-3">389.59</td>
                        <td className="py-2 px-3">869.57</td>
                        <td className="py-2 px-3">20.23</td>
                        <td className="py-2 px-3">0.7</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">13.45</td>
                        <td className="py-2 px-3">Granit</td>
                        <td className="py-2 px-3">7.11</td>
                        <td className="py-2 px-3">430.93</td>
                        <td className="py-2 px-3">625.4</td>
                        <td className="py-2 px-3">13.01</td>
                        <td className="py-2 px-3">3.82</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">404.69</td>
                        <td className="py-2 px-3">Calcaire</td>
                        <td className="py-2 px-3">8.09</td>
                        <td className="py-2 px-3">353.48</td>
                        <td className="py-2 px-3">1.45</td>
                        <td className="py-2 px-3">7.23</td>
                        <td className="py-2 px-3">18.05</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">47.63</td>
                        <td className="py-2 px-3">Basalte</td>
                        <td className="py-2 px-3">8.04</td>
                        <td className="py-2 px-3">31.64</td>
                        <td className="py-2 px-3">353.13</td>
                        <td className="py-2 px-3">14.93</td>
                        <td className="py-2 px-3">0.0</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">212.72</td>
                        <td className="py-2 px-3">Gabbro</td>
                        <td className="py-2 px-3">6.14</td>
                        <td className="py-2 px-3">87.24</td>
                        <td className="py-2 px-3">857.86</td>
                        <td className="py-2 px-3">19.87</td>
                        <td className="py-2 px-3">0.0</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">342.65</td>
                        <td className="py-2 px-3">Schiste</td>
                        <td className="py-2 px-3">8.95</td>
                        <td className="py-2 px-3">44.78</td>
                        <td className="py-2 px-3">27.32</td>
                        <td className="py-2 px-3">6.72</td>
                        <td className="py-2 px-3">6.46</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">126.03</td>
                        <td className="py-2 px-3">Gabbro</td>
                        <td className="py-2 px-3">7.17</td>
                        <td className="py-2 px-3">14.84</td>
                        <td className="py-2 px-3">3.25</td>
                        <td className="py-2 px-3">7.65</td>
                        <td className="py-2 px-3">5.89</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">51.14</td>
                        <td className="py-2 px-3">Granit</td>
                        <td className="py-2 px-3">6.3</td>
                        <td className="py-2 px-3">159.94</td>
                        <td className="py-2 px-3">281.26</td>
                        <td className="py-2 px-3">12.89</td>
                        <td className="py-2 px-3">2.64</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">387.31</td>
                        <td className="py-2 px-3">Gabbro</td>
                        <td className="py-2 px-3">8.26</td>
                        <td className="py-2 px-3">202.25</td>
                        <td className="py-2 px-3">914.0</td>
                        <td className="py-2 px-3">16.01</td>
                        <td className="py-2 px-3">0.0</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">318.79</td>
                        <td className="py-2 px-3">Gabbro</td>
                        <td className="py-2 px-3">7.78</td>
                        <td className="py-2 px-3">128.1</td>
                        <td className="py-2 px-3">901.48</td>
                        <td className="py-2 px-3">16.8</td>
                        <td className="py-2 px-3">0.0</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">494.36</td>
                        <td className="py-2 px-3">Basalte</td>
                        <td className="py-2 px-3">7.87</td>
                        <td className="py-2 px-3">41.66</td>
                        <td className="py-2 px-3">518. robe</td>
                        <td className="py-2 px-3">8.54</td>
                        <td className="py-2 px-3">0.0</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">178.71</td>
                        <td className="py-2 px-3">Granit</td>
                        <td className="py-2 px-3">5.38</td>
                        <td className="py-2 px-3">269.63</td>
                        <td className="py-2 px-3">553.24</td>
                        <td className="py-2 px-3">11.77</td>
                        <td className="py-2 px-3">2.35</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">40.26</td>
                        <td className="py-2 px-3">Gabbro</td>
                        <td className="py-2 px-3">6.61</td>
                        <td className="py-2 px-3">143.93</td>
                        <td className="py-2 px-3">332.01</td>
                        <td className="py-2 px-3">12.85</td>
                        <td className="py-2 px-3">2.9</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3">369.83</td>
                        <td className="py-2 px-3">Schiste</td>
                        <td className="py-2 px-3">8.38</td>
                        <td className="py-2 px-3">400.06</td>
                        <td className="py-2 px-3">243.74</td>
                        <td className="py-2 px-3">7.03</td>
                        <td className="py-2 px-3">12.8</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        );

      case "analyse":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-white dark:bg-gray-900 rounded-3xl p-8 border border-gray-200 dark:border-gray-700 shadow-xl">
              <h1 className="text-3xl md:text-4xl font-bold text-center mb-10 bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent flex items-center justify-center gap-3">
                <ChartBarIcon className="h-9 w-9 text-purple-500" /> Analyse Préliminaire
              </h1>
              <div className="grid md:grid-cols-2 gap-10">
                {/* Bloc résumé */}
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Dimensions</span>
                    <span className="ml-2 px-3 py-1 rounded-full bg-purple-100 text-purple-700 font-mono text-sm">
                      5000 × 7
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Aucune valeur manquante</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Variables</span>
                  </div>
                  <ul className="ml-8 list-disc text-gray-700 dark:text-gray-300 text-sm">
                    <li>
                      profondeur <span className="text-xs text-gray-400">(float64)</span>
                    </li>
                    <li>
                      type_roche <span className="text-xs text-gray-400">(object)</span>
                    </li>
                    <li>
                      ph <span className="text-xs text-gray-400">(float64)</span>
                    </li>
                    <li>
                      conductivite <span className="text-xs text-gray-400">(float64)</span>
                    </li>
                    <li>
                      distance_faille <span className="text-xs text-gray-400">(float64)</span>
                    </li>
                    <li>
                      humidite <span className="text-xs text-gray-400">(float64)</span>
                    </li>
                    <li>
                      teneur_or <span className="text-xs text-gray-400">(float64)</span>
                    </li>
                  </ul>
                </div>
                {/* Bloc statistiques */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <CheckCircleIcon className="h-6 w-6 text-green-500" />
                    <span className="font-semibold text-gray-800 dark:text-gray-200">Statistiques descriptives</span>
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-gray-100 dark:border-gray-800 bg-gray-50 dark:bg-gray-800">
                    <table className="min-w-full text-xs md:text-sm text-left">
                      <thead>
                        <tr className="bg-purple-100 dark:bg-purple-900/30">
                          <th className="py-2 px-3 font-semibold">Variable</th>
                          <th className="py-2 px-3 font-semibold">Moyenne</th>
                          <th className="py-2 px-3 font-semibold">Écart-type</th>
                          <th className="py-2 px-3 font-semibold">Min</th>
                          <th className="py-2 px-3 font-semibold">Max</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-2 px-3">profondeur</td>
                          <td className="py-2 px-3">255.57</td>
                          <td className="py-2 px-3">141.32</td>
                          <td className="py-2 px-3">10.09</td>
                          <td className="py-2 px-3">499.93</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">ph</td>
                          <td className="py-2 px-3">6.78</td>
                          <td className="py-2 px-3">1.29</td>
                          <td className="py-2 px-3">4.50</td>
                          <td className="py-2 px-3">9.00</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">conductivite</td>
                          <td className="py-2 px-3">259.78</td>
                          <td className="py-2 px-3">141.37</td>
                          <td className="py-2 px-3">10.02</td>
                          <td className="py-2 px-3">499.95</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">distance_faille</td>
                          <td className="py-2 px-3">491.85</td>
                          <td className="py-2 px-3">284.94</td>
                          <td className="py-2 px-3">0.11</td>
                          <td className="py-2 px-3">999.70</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">humidite</td>
                          <td className="py-2 px-3">19.94</td>
                          <td className="py-2 px-3">8.68</td>
                          <td className="py-2 px-3">5.00</td>
                          <td className="py-2 px-3">34.99</td>
                        </tr>
                        <tr>
                          <td className="py-2 px-3">teneur_or</td>
                          <td className="py-2 px-3">7.02</td>
                          <td className="py-2 px-3">6.22</td>
                          <td className="py-2 px-3">0.00</td>
                          <td className="py-2 px-3">27.15</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
            {/* Bloc visualisations exploratoires */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-8 text-gray-800 dark:text-white text-center flex items-center justify-center gap-3">
                <ChartBarIcon className="h-7 w-7 text-purple-500" /> Visualisations Exploratoires
              </h2>
              <div className="grid md:grid-cols-2 gap-10">
                {/* Boxplots.png */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col items-center">
                  <Image
                    src="/Boxplots.png"
                    alt="Boxplots des variables principales"
                    width={400}
                    height={300}
                    className="w-full max-w-xs mb-4 rounded-xl border"
                  />
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                    Boxplots des variables principales
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Les boxplots permettent de visualiser la dispersion, la médiane et les valeurs extrêmes de chaque
                    variable. Ils révèlent la présence de valeurs aberrantes et la variabilité des mesures, essentielles
                    pour détecter d’éventuels biais ou anomalies dans les données minières.
                  </p>
                </div>
                {/* Pairplot.png */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col items-center">
                  <Image
                    src="/Pairplot.png"
                    alt="Pairplot des variables"
                    width={400}
                    height={300}
                    className="w-full max-w-xs mb-4 rounded-xl border"
                  />
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Pairplot des variables</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Le pairplot croise chaque variable avec les autres pour mettre en évidence les corrélations, tendances
                    et éventuels regroupements. C’est un outil clé pour repérer les relations linéaires ou non linéaires
                    entre les paramètres géologiques.
                  </p>
                </div>
                {/* distributions.png */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col items-center">
                  <Image
                    src="/distributions.png"
                    alt="Distribution des variables"
                    width={400}
                    height={300}
                    className="w-full max-w-xs mb-4 rounded-xl border"
                  />
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Distribution des variables</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Cette visualisation montre la forme de la distribution de chaque variable (symétrie, aplatissement,
                    présence de queues longues). Elle aide à choisir les transformations statistiques adaptées et à
                    anticiper l’impact sur les modèles prédictifs.
                  </p>
                </div>
                {/* matrice_correlation.png */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col items-center">
                  <Image
                    src="/matrice_correlation.png"
                    alt="Matrice de corrélation"
                    width={400}
                    height={300}
                    className="w-full max-w-xs mb-4 rounded-xl border"
                  />
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">Matrice de corrélation</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    La matrice de corrélation synthétise les relations linéaires entre toutes les variables. Les
                    coefficients élevés signalent des dépendances fortes, utiles pour la sélection de variables et la
                    compréhension des interactions géochimiques.
                  </p>
                </div>
                {/* teneur_moyenne.png */}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg flex flex-col items-center">
                  <Image
                    src="/teneur_moyenne.png"
                    alt="Teneur moyenne en or par groupe"
                    width={400}
                    height={300}
                    className="w-full max-w-xs mb-4 rounded-xl border"
                  />
                  <h3 className="font-semibold text-lg mb-2 text-gray-800 dark:text-white">
                    Teneur moyenne en or par groupe
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Ce graphique compare la teneur moyenne en or selon différents groupes (type de roche, profondeur,
                    etc.). Il met en lumière les conditions géologiques les plus favorables à une forte concentration en
                    or, guidant ainsi les stratégies d’exploration.
                  </p>
                </div>
              </div>
              <div className="mt-12 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-2xl p-8 border border-purple-100 dark:border-purple-800">
                <h3 className="text-xl font-bold mb-4 text-purple-800 dark:text-purple-300 flex items-center gap-2">
                  <SparklesIcon className="h-5 w-5" />Synthèse exploratoire intelligente
                </h3>
                <ul className="list-disc ml-8 text-gray-700 dark:text-gray-200 text-sm space-y-2">
                  <li>
                    Les variables <strong>profondeur</strong> et <strong>distance_faille</strong> présentent une forte
                    variabilité, suggérant des environnements géologiques hétérogènes.
                  </li>
                  <li>
                    Des corrélations marquées entre certaines variables indiquent des processus géochimiques communs ou des
                    effets de structure du sous-sol.
                  </li>
                  <li>
                    La distribution de la <strong>teneur en or</strong> est asymétrique, avec quelques valeurs
                    exceptionnellement élevées, typiques des gisements miniers.
                  </li>
                  <li>
                    Les visualisations révèlent des groupes de données distincts, ouvrant la voie à des analyses de
                    segmentation ou de clustering plus poussées.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        );

      case "entrainement":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mb-6">
                Entraînement des Modèles
              </h1>
              <div className="grid lg:grid-cols-2 gap-8">
                {Object.entries(modelPerformance).map(([modelName, performance]) => {
                  const typedModelName = modelName as ModelName;
                  return (
                    <div
                      key={modelName}
                      className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{modelName}</h3>
                        <button
                          onClick={() => trainModel(typedModelName)}
                          disabled={isLoading}
                          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 disabled:opacity-50"
                        >
                          {isLoading ? (
                            <ClockIcon className="h-4 w-4 animate-spin" />
                          ) : (
                            <PlayIcon className="h-4 w-4" />
                          )}
                          <span>Résultats</span>
                        </button>
                      </div>
                      {modelResults[typedModelName] && (
                        <>
                          {/* Interprétation moderne pour la Régression Linéaire */}
                          {modelName === "Régression Linéaire" && (
                            <div className="mt-8 bg-gradient-to-br from-blue-50 to-cyan-100 dark:from-blue-900/40 dark:to-cyan-900/30 rounded-2xl p-6 border border-blue-200 dark:border-blue-700 shadow-xl animate-fadeIn">
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">📊</span>
                                <h4 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                                  Interprétation des résultats
                                </h4>
                              </div>
                              <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left mb-4">
                                  <thead>
                                    <tr className="bg-blue-100 dark:bg-blue-900/30">
                                      <th className="py-2 px-4 font-semibold">Métrique</th>
                                      <th className="py-2 px-4 font-semibold">Valeur</th>
                                      <th className="py-2 px-4 font-semibold">Interprétation</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-blue-100 dark:border-blue-800">
                                      <td className="py-2 px-4">MAE (Mean Absolute Error)</td>
                                      <td className="py-2 px-4">1.27</td>
                                      <td className="py-2 px-4">En moyenne, le modèle se trompe de 1.27 g/tonne</td>
                                    </tr>
                                    <tr className="border-b border-blue-100 dark:border-blue-800">
                                      <td className="py-2 px-4">RMSE (Root Mean Squared Error)</td>
                                      <td className="py-2 px-4">1.68</td>
                                      <td className="py-2 px-4">Les erreurs importantes sont légèrement pénalisées</td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 px-4">R² (coefficient de détermination)</td>
                                      <td className="py-2 px-4">0.9272</td>
                                      <td className="py-2 px-4">
                                        Le modèle explique 92.7 % de la variance de la teneur en or
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-700">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">✅</span>
                                  <span className="font-semibold text-gray-800 dark:text-white text-lg">
                                    Interprétation globale
                                  </span>
                                </div>
                                <ul className="list-disc ml-8 text-gray-700 dark:text-gray-200 text-sm space-y-1">
                                  <li>Le modèle prédit très bien la teneur en or sur tes données.</li>
                                  <li>
                                    Un <span className="font-bold">R² &gt; 0.9</span> est souvent considéré comme
                                    excellent, surtout avec un modèle aussi simple que la régression linéaire.
                                  </li>
                                  <li>
                                    Le <span className="font-bold">RMSE</span> est proche du{" "}
                                    <span className="font-bold">MAE</span>, donc il n’y a pas d’erreurs très extrêmes.
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                          {/* Interprétation moderne pour la Forêt Aléatoire */}
                          {modelName === "Forêt Aléatoire" && (
                            <div className="mt-8 bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/40 dark:to-emerald-900/30 rounded-2xl p-6 border border-green-200 dark:border-green-700 shadow-xl animate-fadeIn">
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">📊</span>
                                <h4 className="text-2xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                                  Interprétation des résultats — Forêt Aléatoire
                                </h4>
                              </div>
                              <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left mb-4">
                                  <thead>
                                    <tr className="bg-green-100 dark:bg-green-900/30">
                                      <th className="py-2 px-4 font-semibold">Métrique</th>
                                      <th className="py-2 px-4 font-semibold">Valeur</th>
                                      <th className="py-2 px-4 font-semibold">Interprétation</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-green-100 dark:border-green-800">
                                      <td className="py-2 px-4">MAE (Mean Absolute Error)</td>
                                      <td className="py-2 px-4">0.64</td>
                                      <td className="py-2 px-4">En moyenne, le modèle se trompe de 0.64 g/tonne</td>
                                    </tr>
                                    <tr className="border-b border-green-100 dark:border-green-800">
                                      <td className="py-2 px-4">RMSE (Root Mean Squared Error)</td>
                                      <td className="py-2 px-4">0.87</td>
                                      <td className="py-2 px-4">Les erreurs importantes sont faiblement présentes</td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 px-4">R² (coefficient de détermination)</td>
                                      <td className="py-2 px-4">0.9802</td>
                                      <td className="py-2 px-4">
                                        Le modèle explique 98.02 % de la variance de la teneur en or
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="mt-4 p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">✅</span>
                                  <span className="font-semibold text-gray-800 dark:text-white text-lg">
                                    Interprétation globale
                                  </span>
                                </div>
                                <ul className="list-disc ml-8 text-gray-700 dark:text-gray-200 text-sm space-y-1">
                                  <li>Le modèle de Forêt Aléatoire prédit extrêmement bien la teneur en or.</li>
                                  <li>
                                    Un <span className="font-bold">R² de 0.98</span> est quasi-parfait, indiquant une
                                    capacité remarquable à capturer les relations entre les variables.
                                  </li>
                                  <li>
                                    Le <span className="font-bold">MAE</span> très faible (0.64) montre une erreur moyenne
                                    minime, ce qui est excellent en contexte minier.
                                  </li>
                                  <li>
                                    Le <span className="font-bold">RMSE</span> est proche du{" "}
                                    <span className="font-bold">MAE</span>, ce qui indique peu d’erreurs extrêmes.
                                  </li>
                                  <li>
                                    Ce modèle est idéal à déployer dans une application (ex. Streamlit) ou pour impressionner
                                    ton professeur en projet.
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                          {/* Interprétation moderne pour la MLPRegressor */}
                          {modelName === "MLPRegressor" && (
                            <div className="mt-8 bg-gradient-to-br from-purple-50 to-violet-100 dark:from-purple-900/40 dark:to-violet-900/30 rounded-2xl p-6 border border-purple-200 dark:border-purple-700 shadow-xl animate-fadeIn">
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">📊</span>
                                <h4 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
                                  Interprétation des résultats — MLP Regressor
                                </h4>
                              </div>
                              <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left mb-4">
                                  <thead>
                                    <tr className="bg-purple-100 dark:bg-purple-900/30">
                                      <th className="py-2 px-4 font-semibold">Métrique</th>
                                      <th className="py-2 px-4 font-semibold">Valeur</th>
                                      <th className="py-2 px-4 font-semibold">Interprétation</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-purple-100 dark:border-purple-800">
                                      <td className="py-2 px-4">MAE (Mean Absolute Error)</td>
                                      <td className="py-2 px-4">0.22</td>
                                      <td className="py-2 px-4">En moyenne, le modèle se trompe de 0.22 g/tonne</td>
                                    </tr>
                                    <tr className="border-b border-purple-100 dark:border-purple-800">
                                      <td className="py-2 px-4">RMSE (Root Mean Squared Error)</td>
                                      <td className="py-2 px-4">0.28</td>
                                      <td className="py-2 px-4">Les erreurs extrêmes sont quasi inexistantes</td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 px-4">R² (coefficient de détermination)</td>
                                      <td className="py-2 px-4">0.9979</td>
                                      <td className="py-2 px-4">
                                        Le modèle explique 99.79 % de la variance de la teneur en or
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="mt-4 p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl border border-purple-200 dark:border-purple-700">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">✅</span>
                                  <span className="font-semibold text-gray-800 dark:text-white text-lg">
                                    Interprétation globale
                                  </span>
                                </div>
                                <ul className="list-disc ml-8 text-gray-700 dark:text-gray-200 text-sm space-y-1">
                                  <li>
                                    Le MLP Regressor offre des performances exceptionnelles, encore meilleures que la Forêt
                                    Aléatoire.
                                  </li>
                                  <li>
                                    Un <span className="font-bold">R² de 0.9979</span> indique que le modèle capte quasiment
                                    toute la variance de la variable cible.
                                  </li>
                                  <li>
                                    Le <span className="font-bold">MAE</span> très bas (0.22) montre que les erreurs
                                    moyennes sont négligeables.
                                  </li>
                                  <li>
                                    Le <span className="font-bold">RMSE &lt; 0.3</span> indique une très grande stabilité
                                    dans les prédictions, sans dérive ou erreur brutale.
                                  </li>
                                  <li>
                                    Ce modèle est idéal pour une application prédictive fiable, mais attention : il est plus
                                    complexe à expliquer que RF ou LR (boîte noire).
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                          {/* Interprétation moderne pour XGBoost */}
                          {modelName === "XGBoost" && (
                            <div className="mt-8 bg-gradient-to-br from-orange-50 to-yellow-100 dark:from-orange-900/40 dark:to-yellow-900/30 rounded-2xl p-6 border border-yellow-200 dark:border-yellow-700 shadow-xl animate-fadeIn">
                              <div className="flex items-center gap-3 mb-4">
                                <span className="text-3xl">📊</span>
                                <h4 className="text-2xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                                  Interprétation des résultats — XGBoost
                                </h4>
                              </div>
                              <div className="overflow-x-auto">
                                <table className="min-w-full text-sm text-left mb-4">
                                  <thead>
                                    <tr className="bg-yellow-100 dark:bg-yellow-900/30">
                                      <th className="py-2 px-4 font-semibold">Métrique</th>
                                      <th className="py-2 px-4 font-semibold">Valeur</th>
                                      <th className="py-2 px-4 font-semibold">Interprétation</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr className="border-b border-yellow-100 dark:border-yellow-800">
                                      <td className="py-2 px-4">MAE (Mean Absolute Error)</td>
                                      <td className="py-2 px-4">0.52</td>
                                      <td className="py-2 px-4">En moyenne, le modèle se trompe de 0.52 g/tonne</td>
                                    </tr>
                                    <tr className="border-b border-yellow-100 dark:border-yellow-800">
                                      <td className="py-2 px-4">RMSE (Root Mean Squared Error)</td>
                                      <td className="py-2 px-4">0.65</td>
                                      <td className="py-2 px-4">Faibles erreurs quadratiques, les prédictions sont stables</td>
                                    </tr>
                                    <tr>
                                      <td className="py-2 px-4">R² (coefficient de détermination)</td>
                                      <td className="py-2 px-4">0.989</td>
                                      <td className="py-2 px-4">
                                        Le modèle explique 98.9 % de la variance de la teneur en or
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <div className="mt-4 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-xl border border-yellow-200 dark:border-yellow-700">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="text-2xl">✅</span>
                                  <span className="font-semibold text-gray-800 dark:text-white text-lg">
                                    Interprétation globale
                                  </span>
                                </div>
                                <ul className="list-disc ml-8 text-gray-700 dark:text-gray-200 text-sm space-y-1">
                                  <li>
                                    Le modèle XGBoost est très performant, mieux que la régression linéaire et proche de la
                                    Forêt Aléatoire.
                                  </li>
                                  <li>
                                    Un <span className="font-bold">R² de 0.989</span> est un excellent indicateur de qualité
                                    de généralisation.
                                  </li>
                                  <li>
                                    Le <span className="font-bold">MAE</span> de 0.52 signifie que les erreurs moyennes sont
                                    faibles, ce qui est bon pour une utilisation sur le terrain.
                                  </li>
                                  <li>
                                    Le <span className="font-bold">RMSE</span> de 0.65, plus bas que celui de RF, indique
                                    également une précision élevée sans gros écarts.
                                  </li>
                                  <li>
                                    XGBoost est robuste, rapide et performant, idéal pour un modèle en production ou à
                                    démontrer dans un projet.
                                  </li>
                                </ul>
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case "comparatif":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent mb-6">
                Étude Comparative des Modèles
              </h1>
              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg mb-8">
                <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Classement des Performances</h2>
                <div className="space-y-4">
                  {Object.entries(modelPerformance)
                    .sort(([, a], [, b]) => b.r2 - a.r2)
                    .map(([modelName, performance], index) => {
                      const typedModelName = modelName as ModelName;
                      return (
                        <div
                          key={modelName}
                          className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-600 rounded-xl"
                        >
                          <div className="flex items-center space-x-4">
                            <div
                              className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold ${
                                index === 0
                                  ? "bg-yellow-500"
                                  : index === 1
                                  ? "bg-gray-400"
                                  : index === 2
                                  ? "bg-orange-600"
                                  : "bg-gray-300"
                              }`}
                            >
                              {index + 1}
                            </div>
                            <span className="font-semibold text-gray-800 dark:text-white">{modelName}</span>
                          </div>
                          <div className="flex space-x-6 text-sm">
                            <span className="text-gray-600 dark:text-gray-300">
                              R²: <strong>{modelPerformance[typedModelName].r2.toFixed(3)}</strong>
                            </span>
                            <span className="text-gray-600 dark:text-gray-300">
                              RMSE: <strong>{modelPerformance[typedModelName].rmse.toFixed(2)}</strong>
                            </span>
                            <span className="text-gray-600 dark:text-gray-300">
                              Temps: <strong>{modelPerformance[typedModelName].time.toFixed(2)}s</strong>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Métriques de Performance</h3>
                  <div className="space-y-4">
                    {["r2", "rmse", "mae"].map((metric) => (
                      <div key={metric} className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-gray-600 dark:text-gray-300 capitalize">{metric.toUpperCase()}</span>
                        </div>
                        {Object.entries(modelPerformance).map(([name, perf]) => (
                          <div key={name} className="flex items-center space-x-2">
                            <span className="w-24 text-sm text-gray-600 dark:text-gray-400 truncate">{name}</span>
                            <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div
                                className="bg-gradient-to-r from-pink-500 to-rose-500 h-2 rounded-full transition-all duration-1000"
                                style={{
                                  width: `${
                                    metric === "r2"
                                      ? perf.r2 * 100
                                      : metric === "rmse"
                                      ? (1 - perf.rmse / 3) * 100
                                      : (1 - perf.mae / 2.5) * 100
                                  }%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-gray-800 dark:text-white">
                              {metric === "r2" ? perf.r2.toFixed(3) : metric === "rmse" ? perf.rmse.toFixed(3) : perf.mae.toFixed(3)}
                            </span>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-white">Analyse des Résultats</h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                      <h4 className="font-semibold text-purple-800 dark:text-purple-400 mb-2">
                        🏆 Meilleur Modèle — MLP Regressor
                      </h4>
                      <p className="text-purple-700 dark:text-purple-300 text-sm">
                        Le réseau de neurones MLP est de loin le plus performant avec un R² de 0.9979 et les plus faibles
                        erreurs (RMSE : 0.28 / MAE : 0.22).
                        <br />
                        Idéal pour une solution prédictive précise, même si c’est une "boîte noire".
                      </p>
                    </div>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <h4 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">
                        ⚡ Modèle le plus rapide — Régression Linéaire
                      </h4>
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        Le modèle le plus simple à entraîner. Il offre des résultats acceptables (R² : 0.9272) mais bien
                        en dessous des autres.
                        <br />
                        Intéressant pour une interprétation rapide, mais pas optimal pour la prédiction.
                      </p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800">
                      <h4 className="font-semibold text-yellow-800 dark:text-yellow-400 mb-2">
                        🔄 Bon compromis — XGBoost
                      </h4>
                      <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                        Le modèle XGBoost obtient un excellent R² (0.989) avec des erreurs basses (RMSE : 0.65, MAE :
                        0.52).
                        <br />
                        Il offre un très bon compromis entre performance, vitesse et robustesse.
                      </p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <h4 className="font-semibold text-green-800 dark:text-green-400 mb-2">
                        🌳 Modèle robuste — Random Forest
                      </h4>
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        Le modèle Random Forest est très performant aussi (R² : 0.9802) mais un peu en dessous de XGBoost
                        et MLP.
                        <br />
                        Il reste un bon choix si tu veux une solution robuste, stable et interprétable (feature
                        importance).
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "conclusion":
        return (
          <div className="space-y-8 animate-fadeIn">
            <div className="bg-gradient-to-br from-indigo-50 to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-3xl p-8">
              <div className="flex items-center space-x-4 mb-6">
                <div className="p-3 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl">
                  <TrophyIcon className="h-8 w-8 text-white" />
                </div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-blue-600 bg-clip-text text-transparent">
                  Conclusions & Recommandations
                </h1>
              </div>

              <div className="grid lg:grid-cols-2 gap-8 mb-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Résultats Clés</h2>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 dark:text-gray-300">
                        🧠 <strong>MLP Regressor</strong> s’impose comme le meilleur modèle, avec un R² de 0.9979, une
                        erreur moyenne (MAE) de 0.22, et une précision remarquable. Il démontre une excellente capacité
                        prédictive pour la teneur en or.
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 dark:text-gray-300">
                        📊 Les variables géologiques telles que la <strong>profondeur</strong>, la{" "}
                        <strong>distance aux failles</strong> et la <strong>conductivité</strong> apparaissent comme les
                        plus prédictives de la teneur en or, d’après l’analyse des importances des variables (Random
                        Forest).
                      </p>
                    </div>
                    <div className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-700 dark:text-gray-300">
                        ⚙️ Le <strong>prétraitement des données</strong> (encodage des variables, normalisation, suppression
                        des valeurs aberrantes) a permis d'améliorer significativement les performances de tous les
                        modèles, en particulier pour les algorithmes sensibles à l'échelle comme le MLP et XGBoost.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-white">Recommandations</h2>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-800">
                      <h3 className="font-semibold text-green-800 dark:text-green-400 mb-2">📦 Production</h3>
                      <ul className="list-disc ml-6 text-green-700 dark:text-green-300 text-sm space-y-1">
                        <li>
                          ➡️ Déployer le modèle <strong>MLP Regressor</strong> pour les prédictions de teneur en or, car il
                          offre une précision exceptionnelle (R² = 0.9979).
                        </li>
                        <li>
                          ➡️ Un système de monitoring continu est recommandé pour détecter d’éventuelles dérives de données
                          ou baisses de performance.
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-900/20 dark:to-cyan-900/20 rounded-xl border border-blue-200 dark:border-blue-800">
                      <h3 className="font-semibold text-blue-800 dark:text-blue-400 mb-2">🔬 Recherche</h3>
                      <ul className="list-disc ml-6 text-blue-700 dark:text-blue-300 text-sm space-y-1">
                        <li>
                          ➡️ Enrichir la base de données avec davantage de variables géochimiques et minéralogiques (ex :
                          teneurs en cuivre, zinc, silice…).
                        </li>
                        <li>
                          ➡️ Cela permettrait d’affiner la compréhension des relations entre géologie et teneur en or.
                        </li>
                      </ul>
                    </div>
                    <div className="p-4 bg-gradient-to-r from-purple-50 to-violet-50 dark:from-purple-900/20 dark:to-violet-900/20 rounded-xl border border-purple-200 dark:border-purple-800">
                      <h3 className="font-semibold text-purple-800 dark:text-purple-400 mb-2">🚀 Évolution</h3>
                      <ul className="list-disc ml-6 text-purple-700 dark:text-purple-300 text-sm space-y-1">
                        <li>
                          ➡️ Explorer des réseaux de neurones profonds (avec TensorFlow/Keras) ou des architectures CNN/RNN
                          si des données spatiales ou temporelles sont disponibles.
                        </li>
                        <li>
                          ➡️ Tester aussi des modèles d’ensemble hybrides (ex : moyenne pondérée entre MLP et XGBoost) pour
                          maximiser la robustesse.
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl font-semibold mb-6 text-gray-800 dark:text-white">📊 Impact Business</h2>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <span className="text-3xl">💰</span>
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-white">Réduction des Coûts — jusqu’à 25 %</span>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Optimisation des zones d’extraction grâce à des prédictions fiables de la teneur en or, limitant
                        les forages inutiles.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-3xl">⏱️</span>
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-white">Gain de Temps — jusqu’à 40 %</span>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Accélération du processus de prospection minière, avec des modèles capables d’analyser des milliers
                        de points en quelques secondes.
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start space-x-3">
                    <span className="text-3xl">🎯</span>
                    <div>
                      <span className="font-semibold text-gray-800 dark:text-white">
                        Haute Précision — jusqu’à 99.8 % de R²
                      </span>
                      <p className="text-gray-600 dark:text-gray-300 text-sm">
                        Le modèle MLP atteint une fiabilité exceptionnelle, permettant une prise de décision stratégique
                        basée sur des prédictions robustes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-r from-indigo-500 to-blue-500 rounded-2xl p-8 text-white mt-8">
                <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                  🚀 Prochaines Étapes
                </h2>
                                <div className="space-y-2 text-lg">
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">🔧</span>
                    <span>
                      Transformer cette analyse en une application web interactive (par exemple, avec Streamlit ou Flask)
                      pour permettre aux géologues d'entrer de nouvelles données et d'obtenir des prédictions en temps réel.
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">📈</span>
                    <span>
                      Intégrer des visualisations dynamiques supplémentaires, comme des cartes géologiques 3D ou des
                      graphiques interactifs,
                    </span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-2xl">🌍</span>
                    <span>
                      Étendre l’analyse à d’autres gisements ou minerais pour valider la généralisation des modèles à
                      différentes conditions géologiques.
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="flex">
        {/* Sidebar */}
        <aside className="w-80 bg-gradient-to-b from-gray-800 to-gray-900 dark:from-gray-900 dark:to-gray-800 text-white flex flex-col fixed h-screen">
          <div className="p-6 border-b border-gray-700">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Dashboard Minier
            </h1>
          </div>
          <nav className="p-6 space-y-2">
            {/* Download Buttons */}
            <div className="mb-4">
              <span className="block text-xs font-semibold text-gray-500 dark:text-gray-400 mb-2">
                Téléchargements
              </span>
              <div className="flex flex-col gap-2">
                <a
                  href="/dataset.csv"
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-green-400 to-blue-400 text-white font-medium shadow hover:from-green-500 hover:to-blue-500 transition-all"
                >
                  <span>📥</span> Dataset
                </a>
                <a
                  href="/Projet_ML.ipynb"
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-purple-400 to-pink-400 text-white font-medium shadow hover:from-purple-500 hover:to-pink-500 transition-all"
                >
                  <span>📓</span> Notebook
                </a>
                <a
                  href="/Projet_ML.pdf"
                  download
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-orange-400 text-white font-medium shadow hover:from-yellow-500 hover:to-orange-500 transition-all"
                >
                  <span>📄</span> Rapport
                </a>
              </div>
            </div>
            {/* Streamlit Access Button */}
            <div className="px-4 py-2">
              <a
                href="https://prediction-dnzyblcubfgrktmer4bzau.streamlit.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-medium shadow hover:from-cyan-500 hover:to-blue-600 transition-all duration-300 mb-2"
              >
                <BeakerIcon className="h-5 w-5" />
                <span>Accéder à Streamlit</span>
              </a>
            </div>
            {/* Navigation */}
            {navigationItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className="group w-full flex items-center space-x-3 px-4 py-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-100 hover:to-gray-200 dark:hover:from-gray-700 dark:hover:to-gray-600 transition-all duration-300"
                >
                  <Icon
                    className={`h-5 w-5 ${
                      activeSection === item.id
                        ? "text-white"
                        : "text-gray-400 group-hover:text-gray-600 dark:group-hover:text-gray-300"
                    }`}
                  />
                  <span className="font-medium">{item.label}</span>
                  {activeSection === item.id && (
                    <ArrowRightIcon className="h-4 w-4 ml-auto text-white" />
                  )}
                </button>
              );
            })}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 ml-80 p-8">
          <div className="max-w-7xl mx-auto">{renderContent()}</div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;