const STORAGE_KEY = "prep-log-data-v1";
const PROFILE_KEY = "prep-log-profile-v1";
const DB_NAME = "prep-log";
const DB_VERSION = 1;
const DB_STORE = "application";
const DB_STATE_KEY = "state";

const eveningRatings = [
  { key: "mood", label: "Humeur", low: "Très basse", high: "Parfaite" },
  { key: "energy", label: "Énergie", low: "Faible", high: "Haute" },
  { key: "soreness", label: "Courbatures", low: "Absentes", high: "Intenses" },
  { key: "pump", label: "Pump", low: "Absent", high: "Fort" },
  { key: "performance", label: "Performances", low: "En baisse", high: "En hausse" },
  { key: "satiety", label: "Satiété", low: "Très faim", high: "Jamais faim" },
  { key: "stress", label: "Stress", low: "Très élevé", high: "Aucun stress" },
];

const workoutLabels = {
  push: "Push",
  pull: "Pull",
  legs: "Jambes",
  upper: "Haut du corps",
  lower: "Bas du corps",
  full: "Full body",
  light: "Légère",
  standard: "Standard",
  hard: "Intense",
  gym: "Salle complète",
  dumbbells: "Haltères + banc",
  bodyweight: "Poids du corps",
};

const exerciseLibrary = [
  { id: "bench-press", name: "Développé couché barre", focus: ["push", "upper", "full"], equipment: ["gym"], kind: "compound", target: "Pectoraux", reps: "6-10" },
  { id: "incline-machine", name: "Développé incliné machine", focus: ["push", "upper"], equipment: ["gym"], kind: "compound", target: "Haut de pectoraux", reps: "8-12" },
  { id: "incline-db", name: "Développé incliné haltères", focus: ["push", "upper", "full"], equipment: ["gym", "dumbbells"], kind: "compound", target: "Haut de pectoraux", reps: "8-12" },
  { id: "db-press", name: "Développé couché haltères", focus: ["push", "upper", "full"], equipment: ["gym", "dumbbells"], kind: "compound", target: "Pectoraux", reps: "8-12" },
  { id: "push-ups", name: "Pompes contrôlées", focus: ["push", "upper", "full"], equipment: ["gym", "dumbbells", "bodyweight"], kind: "compound", target: "Pectoraux", reps: "10-20" },
  { id: "pike-push-ups", name: "Pompes pike", focus: ["push", "upper", "full"], equipment: ["gym", "dumbbells", "bodyweight"], kind: "compound", target: "Épaules", reps: "8-15" },
  { id: "shoulder-press-machine", name: "Développé épaules machine", focus: ["push", "upper"], equipment: ["gym"], kind: "compound", target: "Épaules", reps: "8-12" },
  { id: "shoulder-press-db", name: "Développé épaules haltères", focus: ["push", "upper", "full"], equipment: ["gym", "dumbbells"], kind: "compound", target: "Épaules", reps: "8-12" },
  { id: "cable-fly", name: "Écartés à la poulie", focus: ["push", "upper"], equipment: ["gym"], kind: "isolation", target: "Pectoraux", reps: "12-20" },
  { id: "db-fly", name: "Écartés haltères", focus: ["push", "upper"], equipment: ["gym", "dumbbells"], kind: "isolation", target: "Pectoraux", reps: "12-15" },
  { id: "lateral-raise", name: "Élévations latérales", focus: ["push", "upper", "full"], equipment: ["gym", "dumbbells"], kind: "isolation", target: "Deltoïdes", reps: "12-20" },
  { id: "lateral-bodyweight", name: "Élévations latérales au mur", focus: ["push", "upper"], equipment: ["bodyweight"], kind: "isolation", target: "Deltoïdes", reps: "12-20" },
  { id: "triceps-pushdown", name: "Extension triceps poulie", focus: ["push", "upper"], equipment: ["gym"], kind: "isolation", target: "Triceps", reps: "10-15" },
  { id: "triceps-db", name: "Extension triceps haltère", focus: ["push", "upper"], equipment: ["gym", "dumbbells"], kind: "isolation", target: "Triceps", reps: "10-15" },
  { id: "diamond-push-ups", name: "Pompes diamant", focus: ["push", "upper"], equipment: ["gym", "dumbbells", "bodyweight"], kind: "isolation", target: "Triceps", reps: "8-15" },
  { id: "pull-ups", name: "Tractions pronation", focus: ["pull", "upper", "full"], equipment: ["gym", "bodyweight"], kind: "compound", target: "Dos", reps: "5-10" },
  { id: "inverted-row", name: "Rowing inversé", focus: ["pull", "upper", "full"], equipment: ["gym", "bodyweight"], kind: "compound", target: "Dos", reps: "8-15" },
  { id: "lat-pulldown", name: "Tirage vertical", focus: ["pull", "upper", "full"], equipment: ["gym"], kind: "compound", target: "Dos", reps: "8-12" },
  { id: "barbell-row", name: "Rowing barre", focus: ["pull", "upper", "full"], equipment: ["gym"], kind: "compound", target: "Dos", reps: "6-10" },
  { id: "db-row", name: "Rowing unilatéral haltère", focus: ["pull", "upper", "full"], equipment: ["gym", "dumbbells"], kind: "compound", target: "Dos", reps: "8-12 / côté" },
  { id: "chest-supported-row", name: "Rowing haltères sur banc", focus: ["pull", "upper"], equipment: ["gym", "dumbbells"], kind: "compound", target: "Dos", reps: "10-15" },
  { id: "rear-delt-machine", name: "Oiseau machine", focus: ["pull", "upper"], equipment: ["gym"], kind: "isolation", target: "Arrière d'épaule", reps: "12-20" },
  { id: "rear-delt-db", name: "Oiseau haltères", focus: ["pull", "upper"], equipment: ["gym", "dumbbells"], kind: "isolation", target: "Arrière d'épaule", reps: "12-20" },
  { id: "prone-y-raise", name: "Élévations Y au sol", focus: ["pull", "upper"], equipment: ["gym", "dumbbells", "bodyweight"], kind: "isolation", target: "Haut du dos", reps: "12-20" },
  { id: "barbell-curl", name: "Curl barre", focus: ["pull", "upper"], equipment: ["gym"], kind: "isolation", target: "Biceps", reps: "8-12" },
  { id: "db-curl", name: "Curl alterné haltères", focus: ["pull", "upper"], equipment: ["gym", "dumbbells"], kind: "isolation", target: "Biceps", reps: "10-15" },
  { id: "isometric-curl", name: "Curl isométrique auto-résisté", focus: ["pull", "upper"], equipment: ["bodyweight"], kind: "isolation", target: "Biceps", reps: "20-30 sec / côté" },
  { id: "back-extension", name: "Extensions lombaires au sol", focus: ["pull", "lower", "full"], equipment: ["gym", "dumbbells", "bodyweight"], kind: "isolation", target: "Lombaires", reps: "12-20" },
  { id: "back-squat", name: "Squat barre", focus: ["legs", "lower", "full"], equipment: ["gym"], kind: "compound", target: "Quadriceps", reps: "6-10" },
  { id: "hack-squat", name: "Hack squat", focus: ["legs", "lower", "full"], equipment: ["gym"], kind: "compound", target: "Quadriceps", reps: "8-12" },
  { id: "goblet-squat", name: "Goblet squat", focus: ["legs", "lower", "full"], equipment: ["gym", "dumbbells"], kind: "compound", target: "Quadriceps", reps: "10-15" },
  { id: "tempo-squat", name: "Squat tempo au poids du corps", focus: ["legs", "lower", "full"], equipment: ["gym", "dumbbells", "bodyweight"], kind: "compound", target: "Quadriceps", reps: "12-20" },
  { id: "leg-press", name: "Presse à cuisses", focus: ["legs", "lower", "full"], equipment: ["gym"], kind: "compound", target: "Quadriceps", reps: "10-15" },
  { id: "bulgarian-split", name: "Fentes bulgares", focus: ["legs", "lower", "full"], equipment: ["gym", "dumbbells", "bodyweight"], kind: "compound", target: "Quadriceps / fessiers", reps: "8-12 / côté" },
  { id: "walking-lunge", name: "Fentes marchées", focus: ["legs", "lower", "full"], equipment: ["gym", "dumbbells", "bodyweight"], kind: "compound", target: "Jambes", reps: "10-16 / côté" },
  { id: "romanian-deadlift", name: "Soulevé de terre roumain", focus: ["legs", "lower", "full"], equipment: ["gym"], kind: "compound", target: "Ischio-jambiers", reps: "6-10" },
  { id: "db-rdl", name: "Soulevé de terre roumain haltères", focus: ["legs", "lower", "full"], equipment: ["gym", "dumbbells"], kind: "compound", target: "Ischio-jambiers", reps: "8-12" },
  { id: "single-leg-rdl", name: "Hip hinge une jambe", focus: ["legs", "lower", "full"], equipment: ["gym", "dumbbells", "bodyweight"], kind: "compound", target: "Ischio-jambiers", reps: "10-15 / côté" },
  { id: "leg-curl", name: "Leg curl", focus: ["legs", "lower"], equipment: ["gym"], kind: "isolation", target: "Ischio-jambiers", reps: "10-15" },
  { id: "sliding-leg-curl", name: "Leg curl glissé au sol", focus: ["legs", "lower"], equipment: ["bodyweight"], kind: "isolation", target: "Ischio-jambiers", reps: "8-15" },
  { id: "hip-thrust", name: "Hip thrust", focus: ["legs", "lower", "full"], equipment: ["gym"], kind: "compound", target: "Fessiers", reps: "8-12" },
  { id: "db-hip-thrust", name: "Hip thrust avec haltère", focus: ["legs", "lower", "full"], equipment: ["gym", "dumbbells"], kind: "compound", target: "Fessiers", reps: "10-15" },
  { id: "glute-bridge", name: "Pont fessier", focus: ["legs", "lower", "full"], equipment: ["gym", "dumbbells", "bodyweight"], kind: "isolation", target: "Fessiers", reps: "15-25" },
  { id: "leg-extension", name: "Leg extension", focus: ["legs", "lower"], equipment: ["gym"], kind: "isolation", target: "Quadriceps", reps: "12-20" },
  { id: "sissy-squat", name: "Sissy squat assisté", focus: ["legs", "lower"], equipment: ["gym", "dumbbells", "bodyweight"], kind: "isolation", target: "Quadriceps", reps: "10-20" },
  { id: "calf-raise", name: "Mollets debout", focus: ["legs", "lower", "full"], equipment: ["gym", "dumbbells", "bodyweight"], kind: "isolation", target: "Mollets", reps: "12-25" },
  { id: "plank", name: "Gainage planche", focus: ["push", "pull", "legs", "upper", "lower", "full"], equipment: ["gym", "dumbbells", "bodyweight"], kind: "core", target: "Sangle abdominale", reps: "30-60 sec" },
  { id: "dead-bug", name: "Dead bug", focus: ["push", "pull", "legs", "upper", "lower", "full"], equipment: ["gym", "dumbbells", "bodyweight"], kind: "core", target: "Sangle abdominale", reps: "8-12 / côté" },
  { id: "hanging-knee-raise", name: "Relevés de genoux suspendu", focus: ["pull", "upper", "full"], equipment: ["gym", "bodyweight"], kind: "core", target: "Abdominaux", reps: "10-15" },
];

const defaultProfile = {
  firstName: "Vincent",
  coachName: "Luc Chambrier",
  stepGoal: 15000,
  hydrationGoal: 4,
};

let entries = {};
let profile = { ...defaultProfile };
let activeRoute = "home";
let historyFilter = "all";
let installPrompt = null;
let toastTimer = null;
let databasePromise = null;
let currentWorkout = null;
let currentWorkoutDate = null;

const dom = {
  content: document.querySelector("#app-content"),
  views: [...document.querySelectorAll("[data-view]")],
  navItems: [...document.querySelectorAll(".nav-item")],
  morningForm: document.querySelector("#morning-form"),
  eveningForm: document.querySelector("#evening-form"),
  workoutResult: document.querySelector("#workout-result"),
  exerciseList: document.querySelector("#exercise-list"),
  historyList: document.querySelector("#history-list"),
  historyEmpty: document.querySelector("#history-empty"),
  historySearch: document.querySelector("#history-search"),
  settingsDialog: document.querySelector("#settings-dialog"),
  settingsForm: document.querySelector("#settings-form"),
  toast: document.querySelector("#toast"),
  toastMessage: document.querySelector("#toast-message"),
};

function loadJson(key, fallback) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

function openDatabase() {
  if (!("indexedDB" in window)) return Promise.resolve(null);
  if (databasePromise) return databasePromise;
  databasePromise = new Promise((resolve) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const database = request.result;
      if (!database.objectStoreNames.contains(DB_STORE)) {
        database.createObjectStore(DB_STORE);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => resolve(null);
    request.onblocked = () => resolve(null);
  });
  return databasePromise;
}

async function readDatabaseState() {
  const database = await openDatabase();
  if (!database) return null;
  return new Promise((resolve) => {
    const transaction = database.transaction(DB_STORE, "readonly");
    const request = transaction.objectStore(DB_STORE).get(DB_STATE_KEY);
    request.onsuccess = () => resolve(request.result || null);
    request.onerror = () => resolve(null);
  });
}

async function writeDatabaseState() {
  const database = await openDatabase();
  if (!database) return false;
  return new Promise((resolve) => {
    const transaction = database.transaction(DB_STORE, "readwrite");
    transaction.objectStore(DB_STORE).put(
      {
        version: 1,
        entries,
        profile,
        updatedAt: new Date().toISOString(),
      },
      DB_STATE_KEY,
    );
    transaction.oncomplete = () => resolve(true);
    transaction.onerror = () => resolve(false);
    transaction.onabort = () => resolve(false);
  });
}

async function loadPersistentData() {
  const legacyEntries = loadJson(STORAGE_KEY, {});
  const legacyProfile = loadJson(PROFILE_KEY, {});
  const stored = await readDatabaseState();

  if (stored) {
    entries = stored.entries || {};
    profile = { ...defaultProfile, ...(stored.profile || {}) };
  } else {
    entries = legacyEntries;
    profile = { ...defaultProfile, ...legacyProfile };
    await writeDatabaseState();
  }

  try {
    if (navigator.storage?.persist) await navigator.storage.persist();
  } catch {
    // Storage persistence is best-effort and does not block normal use.
  }
}

function saveEntries() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  void writeDatabaseState();
}

function saveProfile() {
  localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  void writeDatabaseState();
}

function todayKey() {
  const now = new Date();
  return `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`;
}

function parseLocalDate(dateString) {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function formatDate(dateString, options = {}) {
  if (!dateString) return "—";
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: options.long ? "long" : "short",
    year: options.year ? "numeric" : undefined,
    weekday: options.weekday ? "long" : undefined,
  }).format(parseLocalDate(dateString));
}

function weekNumber(date = new Date()) {
  const value = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  const day = value.getUTCDay() || 7;
  value.setUTCDate(value.getUTCDate() + 4 - day);
  const yearStart = new Date(Date.UTC(value.getUTCFullYear(), 0, 1));
  return Math.ceil(((value - yearStart) / 86400000 + 1) / 7);
}

function startOfWeek(date = new Date()) {
  const copy = new Date(date);
  const day = copy.getDay() || 7;
  copy.setHours(0, 0, 0, 0);
  copy.setDate(copy.getDate() - day + 1);
  return copy;
}

function isInCurrentWeek(dateString) {
  const date = parseLocalDate(dateString);
  const start = startOfWeek();
  const end = new Date(start);
  end.setDate(end.getDate() + 7);
  return date >= start && date < end;
}

function hasValue(value) {
  return value !== undefined && value !== null && value !== "";
}

function numberOrNull(value) {
  if (value === "" || value === undefined || value === null) return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function average(values) {
  const numeric = values.filter((value) => Number.isFinite(Number(value))).map(Number);
  if (!numeric.length) return null;
  return numeric.reduce((sum, value) => sum + value, 0) / numeric.length;
}

function round(value, digits = 1) {
  if (value === null || value === undefined) return "—";
  return Number(value).toFixed(digits).replace(".", ",");
}

function formatNumber(value) {
  if (!Number.isFinite(Number(value))) return "—";
  return new Intl.NumberFormat("fr-FR").format(Number(value));
}

function escapeHtml(value = "") {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function showToast(message) {
  dom.toastMessage.textContent = message;
  dom.toast.classList.add("is-visible");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => dom.toast.classList.remove("is-visible"), 2600);
}

function routeTo(route, options = {}) {
  activeRoute = route;
  dom.views.forEach((view) => view.classList.toggle("is-active", view.dataset.view === route));
  dom.navItems.forEach((item) => item.classList.toggle("is-active", item.dataset.route === route));

  if (route === "home") renderDashboard();
  if (route === "morning") populateMorningForm(options.date || todayKey());
  if (route === "evening") populateEveningForm(options.date || todayKey());
  if (route === "workout") populateWorkoutBuilder(options.date || todayKey());
  if (route === "history") renderHistory();

  window.scrollTo({ top: 0, behavior: "smooth" });
  dom.content.focus({ preventScroll: true });
}

function getEntry(date) {
  return entries[date] || { date };
}

function ensureEntry(date) {
  entries[date] ||= { date };
  return entries[date];
}

function createRatingScale(container, key, value = null) {
  container.innerHTML = "";
  container.dataset.rating = key;
  for (let rating = 1; rating <= 7; rating += 1) {
    const button = document.createElement("button");
    button.type = "button";
    button.textContent = rating;
    button.dataset.value = rating;
    button.classList.toggle("is-selected", Number(value) === rating);
    button.setAttribute("aria-label", `Note ${rating} sur 7`);
    container.append(button);
  }
}

function setRating(container, value) {
  container.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-selected", Number(button.dataset.value) === Number(value));
  });
  container.dataset.value = value || "";
  const output = document.querySelector(`[data-rating-output="${container.dataset.rating}"]`);
  if (output) output.textContent = value ? `${value}/7` : "—";
}

function ratingValue(key) {
  const container = document.querySelector(`[data-rating="${key}"]`);
  return numberOrNull(container?.dataset.value);
}

function buildRatings() {
  createRatingScale(document.querySelector('[data-rating="sleepQuality"]'), "sleepQuality");
  const stack = document.querySelector("#evening-ratings");
  stack.innerHTML = eveningRatings
    .map(
      ({ key, label, low, high }) => `
        <div class="rating-row">
          <div class="rating-row-header">
            <span>${label}<small>${low} → ${high}</small></span>
            <output data-rating-output="${key}">—</output>
          </div>
          <div class="rating-scale" data-rating="${key}"></div>
        </div>
      `,
    )
    .join("");
  eveningRatings.forEach(({ key }) => createRatingScale(document.querySelector(`[data-rating="${key}"]`), key));
}

function formToObject(form) {
  return Object.fromEntries(new FormData(form).entries());
}

function setField(form, name, value) {
  const field = form.elements.namedItem(name);
  if (field) field.value = value ?? "";
}

function populateMorningForm(date) {
  const entry = getEntry(date);
  const morning = entry.morning || {};
  dom.morningForm.reset();
  setField(dom.morningForm, "date", date);
  ["weight", "bedtime", "wakeTime", "bloodPressure", "heartRate", "bloodGlucose"].forEach((field) =>
    setField(dom.morningForm, field, morning[field]),
  );
  setRating(document.querySelector('[data-rating="sleepQuality"]'), morning.sleepQuality);

  const hasHealth = ["bloodPressure", "heartRate", "bloodGlucose"].some((field) => hasValue(morning[field]));
  toggleAccordion(hasHealth);
}

function populateEveningForm(date) {
  const entry = getEntry(date);
  const evening = entry.evening || {};
  dom.eveningForm.reset();
  setField(dom.eveningForm, "date", date);
  ["phase", "hydration", "caffeine", "steps", "cardio", "training", "digestion", "injuryDetails", "sickDetails", "notes"].forEach(
    (field) => setField(dom.eveningForm, field, evening[field]),
  );
  eveningRatings.forEach(({ key }) => setRating(document.querySelector(`[data-rating="${key}"]`), evening[key]));
  setSegmented("injury", evening.injury || "Non");
  setSegmented("sick", evening.sick || "Non");
}

function toggleAccordion(open) {
  const trigger = document.querySelector(".accordion-trigger");
  const content = document.querySelector("#health-fields");
  trigger.setAttribute("aria-expanded", String(open));
  content.hidden = !open;
}

function setSegmented(key, value) {
  const control = document.querySelector(`[data-segmented="${key}"]`);
  control.dataset.value = value;
  control.querySelectorAll("button").forEach((button) => {
    button.classList.toggle("is-selected", button.dataset.value === value);
  });
  const conditional = document.querySelector(`[data-condition="${key}"]`);
  if (conditional) conditional.hidden = value !== "Oui";
}

function saveMorning(event) {
  event.preventDefault();
  const values = formToObject(dom.morningForm);
  const date = values.date;
  const entry = ensureEntry(date);
  entry.morning = {
    weight: numberOrNull(values.weight),
    bedtime: values.bedtime || "",
    wakeTime: values.wakeTime || "",
    sleepQuality: ratingValue("sleepQuality"),
    bloodPressure: values.bloodPressure.trim(),
    heartRate: numberOrNull(values.heartRate),
    bloodGlucose: numberOrNull(values.bloodGlucose),
    savedAt: new Date().toISOString(),
  };
  saveEntries();
  showToast("Saisie du matin enregistrée");
  routeTo("home");
}

function saveEvening(event) {
  event.preventDefault();
  const values = formToObject(dom.eveningForm);
  const date = values.date;
  const entry = ensureEntry(date);
  entry.evening = {
    phase: values.phase,
    hydration: numberOrNull(values.hydration),
    caffeine: numberOrNull(values.caffeine),
    steps: numberOrNull(values.steps),
    cardio: values.cardio.trim(),
    training: values.training,
    ...Object.fromEntries(eveningRatings.map(({ key }) => [key, ratingValue(key)])),
    injury: document.querySelector('[data-segmented="injury"]').dataset.value || "Non",
    injuryDetails: values.injuryDetails.trim(),
    sick: document.querySelector('[data-segmented="sick"]').dataset.value || "Non",
    sickDetails: values.sickDetails.trim(),
    digestion: values.digestion,
    notes: values.notes.trim(),
    savedAt: new Date().toISOString(),
  };
  saveEntries();
  showToast("Saisie du soir enregistrée");
  routeTo("home");
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[randomIndex]] = [copy[randomIndex], copy[index]];
  }
  return copy;
}

function workoutExerciseCount(duration) {
  if (duration <= 35) return 4;
  if (duration <= 50) return 6;
  if (duration <= 65) return 7;
  return 8;
}

function exercisePrescription(exercise, intensity) {
  const prescriptions = {
    light: {
      compound: { sets: 2, rest: 75 },
      isolation: { sets: 2, rest: 45 },
      core: { sets: 2, rest: 45 },
      effort: "Garde 3 répétitions en réserve",
    },
    standard: {
      compound: { sets: 3, rest: 120 },
      isolation: { sets: 3, rest: 75 },
      core: { sets: 3, rest: 60 },
      effort: "Garde 2 répétitions en réserve",
    },
    hard: {
      compound: { sets: 4, rest: 150 },
      isolation: { sets: 3, rest: 90 },
      core: { sets: 3, rest: 60 },
      effort: "Garde 1 répétition en réserve",
    },
  };
  const prescription = prescriptions[intensity];
  return {
    ...exercise,
    sets: prescription[exercise.kind].sets,
    rest: prescription[exercise.kind].rest,
    effort: prescription.effort,
  };
}

function recentInjury() {
  return Object.values(entries)
    .filter((entry) => entry.evening?.injury === "Oui")
    .sort((a, b) => b.date.localeCompare(a.date))
    .some((entry) => {
      const daysAgo = (parseLocalDate(todayKey()) - parseLocalDate(entry.date)) / 86400000;
      return daysAgo >= 0 && daysAgo <= 7;
    });
}

function eligibleExercises(focus, equipment) {
  return exerciseLibrary.filter(
    (exercise) => exercise.focus.includes(focus) && exercise.equipment.includes(equipment),
  );
}

function exerciseMuscleGroup(exercise) {
  const target = exercise.target.toLowerCase();
  if (target.includes("pect")) return "chest";
  if (target.includes("dos") || target.includes("lomb")) return "back";
  if (target.includes("épaule") || target.includes("delto")) return "shoulders";
  if (target.includes("triceps")) return "triceps";
  if (target.includes("biceps")) return "biceps";
  if (target.includes("quadriceps")) return "quads";
  if (target.includes("ischio")) return "hamstrings";
  if (target.includes("fessier")) return "glutes";
  if (target.includes("mollet")) return "calves";
  if (target.includes("abdominal") || target.includes("sangle")) return "core";
  return exercise.target;
}

function pickDiverse(candidates, count, selected = []) {
  if (count <= 0) return [];
  const available = shuffle(candidates.filter((exercise) => !selected.some((item) => item.id === exercise.id)));
  const usedGroups = new Set(selected.map(exerciseMuscleGroup));
  const diverse = available.filter((exercise) => !usedGroups.has(exerciseMuscleGroup(exercise)));
  const remainder = available.filter((exercise) => !diverse.includes(exercise));
  return [...diverse, ...remainder].slice(0, count);
}

function buildWorkout() {
  const focus = document.querySelector("#workout-focus").value;
  const duration = Number(document.querySelector("#workout-duration").value);
  const equipment = document.querySelector("#workout-equipment").value;
  let intensity = document.querySelector("#workout-intensity").value;
  const injuryWarning = recentInjury();
  if (injuryWarning && intensity === "hard") {
    intensity = "light";
    document.querySelector("#workout-intensity").value = intensity;
    showToast("Intensité réduite : douleur récente signalée");
  }

  const candidates = eligibleExercises(focus, equipment);
  const desiredCount = Math.min(workoutExerciseCount(duration), candidates.length);
  const compounds = candidates.filter((exercise) => exercise.kind === "compound");
  const accessories = candidates.filter((exercise) => exercise.kind !== "compound");
  const minimumCompounds = focus === "full" ? 3 : 2;
  const compoundCount = Math.min(Math.max(minimumCompounds, Math.ceil(desiredCount / 2)), compounds.length);
  const selected = [];

  if (focus === "full") {
    ["push", "pull", "legs"].forEach((area) => {
      const [exercise] = shuffle(
        compounds.filter(
          (candidate) => candidate.focus.includes(area) && !selected.some((item) => item.id === candidate.id),
        ),
      );
      if (exercise) selected.push(exercise);
    });
  } else if (focus === "upper") {
    ["push", "pull"].forEach((area) => {
      const [exercise] = shuffle(
        compounds.filter(
          (candidate) => candidate.focus.includes(area) && !selected.some((item) => item.id === candidate.id),
        ),
      );
      if (exercise) selected.push(exercise);
    });
  }

  selected.push(...pickDiverse(compounds, compoundCount - selected.length, selected));
  selected.push(...pickDiverse(accessories, desiredCount - selected.length, selected));

  if (selected.length < desiredCount) {
    const selectedIds = new Set(selected.map((exercise) => exercise.id));
    selected.push(...shuffle(candidates.filter((exercise) => !selectedIds.has(exercise.id))).slice(0, desiredCount - selected.length));
  }

  currentWorkout = {
    focus,
    duration,
    equipment,
    intensity,
    title: workoutLabels[focus],
    exercises: selected.map((exercise) => exercisePrescription(exercise, intensity)),
    generatedAt: new Date().toISOString(),
  };
  renderWorkout();
}

function populateWorkoutBuilder(date) {
  currentWorkoutDate = date;
  const savedWorkout = getEntry(date).workout;
  currentWorkout = savedWorkout ? structuredClone(savedWorkout) : null;

  if (savedWorkout) {
    document.querySelector("#workout-focus").value = savedWorkout.focus;
    document.querySelector("#workout-duration").value = String(savedWorkout.duration);
    document.querySelector("#workout-equipment").value = savedWorkout.equipment;
    document.querySelector("#workout-intensity").value = savedWorkout.intensity;
    renderWorkout();
  } else {
    dom.workoutResult.classList.add("is-hidden");
    dom.exerciseList.innerHTML = "";
  }

  document.querySelector("#save-workout-label").textContent =
    date === todayKey() ? "Enregistrer aujourd’hui" : `Enregistrer le ${formatDate(date)}`;
}

function renderWorkout() {
  if (!currentWorkout) return;
  document.querySelector("#generated-workout-title").textContent =
    `${currentWorkout.title} · ${currentWorkout.duration} min`;
  document.querySelector("#generated-workout-meta").textContent =
    `${currentWorkout.exercises.length} exercices · Intensité ${workoutLabels[currentWorkout.intensity].toLowerCase()} · ${workoutLabels[currentWorkout.equipment]}`;
  document.querySelector("#workout-warning").classList.toggle("is-hidden", !recentInjury());
  dom.exerciseList.innerHTML = currentWorkout.exercises
    .map(
      (exercise, index) => `
        <li class="exercise-card">
          <span class="exercise-index">${String(index + 1).padStart(2, "0")}</span>
          <div class="exercise-copy">
            <strong>${escapeHtml(exercise.name)}</strong>
            <span>${escapeHtml(exercise.target)} · ${exercise.sets} × ${escapeHtml(exercise.reps)}</span>
            <small>${exercise.rest} sec de repos · ${escapeHtml(exercise.effort)}</small>
          </div>
          <button type="button" data-replace-exercise="${index}" aria-label="Changer ${escapeHtml(exercise.name)}">
            <svg viewBox="0 0 24 24"><path d="M20 7h-4V3M4 17h4v4M5.5 8.5A7 7 0 0 1 16 5l4 2M18.5 15.5A7 7 0 0 1 8 19l-4-2"></path></svg>
          </button>
        </li>
      `,
    )
    .join("");
  dom.workoutResult.classList.remove("is-hidden");
}

function replaceWorkoutExercise(index) {
  if (!currentWorkout) return;
  const existing = currentWorkout.exercises[index];
  const usedIds = new Set(currentWorkout.exercises.map((exercise) => exercise.id));
  const unused = eligibleExercises(currentWorkout.focus, currentWorkout.equipment).filter(
    (exercise) => !usedIds.has(exercise.id),
  );
  const movementAreas = currentWorkout.focus === "full" ? ["push", "pull", "legs"] : ["push", "pull"];
  const movementArea = movementAreas.find((area) => existing.focus.includes(area));
  const sameRole = unused.filter(
    (exercise) =>
      exercise.kind === existing.kind &&
      (movementArea ? exercise.focus.includes(movementArea) : exerciseMuscleGroup(exercise) === exerciseMuscleGroup(existing)),
  );
  const sameKind = unused.filter((exercise) => exercise.kind === existing.kind);
  const [replacement] = shuffle(sameRole.length ? sameRole : sameKind.length ? sameKind : unused);
  if (!replacement) {
    showToast("Aucune autre variante disponible");
    return;
  }
  currentWorkout.exercises[index] = exercisePrescription(replacement, currentWorkout.intensity);
  renderWorkout();
}

function saveWorkout() {
  if (!currentWorkout || !currentWorkoutDate) return;
  const entry = ensureEntry(currentWorkoutDate);
  entry.workout = {
    ...structuredClone(currentWorkout),
    savedAt: new Date().toISOString(),
  };
  saveEntries();
  showToast("Séance enregistrée dans ton historique");
}

function renderDashboard() {
  const today = todayKey();
  const entry = getEntry(today);
  const morningComplete = Boolean(entry.morning);
  const eveningComplete = Boolean(entry.evening);
  const percent = (Number(morningComplete) + Number(eveningComplete)) * 50;
  const now = new Date();

  document.querySelector("#today-label").textContent = new Intl.DateTimeFormat("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
  })
    .format(now)
    .toUpperCase();
  document.querySelector("#home-title").textContent = `Bonjour ${profile.firstName}.`;
  document.querySelector("#current-week").textContent = weekNumber(now);
  document.querySelector("#completion-value").textContent = `${percent}%`;
  document.querySelector("#completion-ring").style.setProperty("--progress", `${percent * 3.6}deg`);

  updateCheckinStatus("morning", morningComplete, entry.morning?.savedAt);
  updateCheckinStatus("evening", eveningComplete, entry.evening?.savedAt);

  const weekEntries = Object.values(entries).filter((item) => isInCurrentWeek(item.date));
  const weightAverage = average(weekEntries.map((item) => item.morning?.weight));
  const sleepAverage = average(weekEntries.map((item) => item.morning?.sleepQuality));
  const stepAverage = average(weekEntries.map((item) => item.evening?.steps));
  const waterAverage = average(weekEntries.map((item) => item.evening?.hydration));

  document.querySelector("#metric-weight").textContent = round(weightAverage);
  document.querySelector("#metric-sleep").textContent = round(sleepAverage);
  document.querySelector("#metric-steps").textContent = stepAverage === null ? "—" : formatNumber(Math.round(stepAverage));
  document.querySelector("#metric-water").textContent = round(waterAverage);

  const previousWeight = previousWeekAverage("weight");
  const weightTrend = document.querySelector("#metric-weight-trend");
  weightTrend.className = "metric-trend";
  if (weightAverage !== null && previousWeight !== null) {
    const difference = weightAverage - previousWeight;
    weightTrend.textContent = `${difference >= 0 ? "+" : ""}${round(difference)} kg vs semaine passée`;
    weightTrend.classList.add(Math.abs(difference) <= 0.5 ? "is-positive" : "is-warning");
  } else {
    weightTrend.textContent = "Pas assez de données";
  }

  document.querySelector("#metric-sleep-trend").textContent =
    sleepAverage === null ? "Qualité moyenne" : sleepAverage >= 5 ? "Récupération correcte" : "Récupération à surveiller";
  document.querySelector("#metric-sleep-trend").className =
    `metric-trend ${sleepAverage !== null && sleepAverage >= 5 ? "is-positive" : sleepAverage !== null ? "is-warning" : ""}`;
  document.querySelector("#metric-steps-trend").textContent =
    stepAverage === null
      ? `Objectif ${formatNumber(profile.stepGoal)}`
      : stepAverage >= profile.stepGoal
        ? "Objectif atteint"
        : `${formatNumber(Math.max(0, Math.round(profile.stepGoal - stepAverage)))} sous l'objectif`;
  document.querySelector("#metric-steps-trend").className =
    `metric-trend ${stepAverage !== null && stepAverage >= profile.stepGoal ? "is-positive" : stepAverage !== null ? "is-warning" : ""}`;

  renderWeightChart();
  renderAlerts();
}

function updateCheckinStatus(type, complete, savedAt) {
  const card = document.querySelector(`[data-route="${type}"].checkin-action`);
  const label = document.querySelector(`#${type}-status`);
  card.classList.toggle("is-complete", complete);
  label.textContent = complete
    ? `Fait à ${new Intl.DateTimeFormat("fr-FR", { hour: "2-digit", minute: "2-digit" }).format(new Date(savedAt))}`
    : "À compléter";
}

function previousWeekAverage(field) {
  const start = startOfWeek();
  const previousStart = new Date(start);
  previousStart.setDate(previousStart.getDate() - 7);
  return average(
    Object.values(entries)
      .filter((entry) => {
        const date = parseLocalDate(entry.date);
        return date >= previousStart && date < start;
      })
      .map((entry) => entry.morning?.[field]),
  );
}

function renderWeightChart() {
  const points = Object.values(entries)
    .filter((entry) => Number.isFinite(Number(entry.morning?.weight)))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(-14)
    .map((entry) => ({ date: entry.date, value: Number(entry.morning.weight) }));

  const svg = document.querySelector("#weight-chart");
  const empty = document.querySelector("#empty-chart");
  const line = document.querySelector("#weight-line");
  const area = document.querySelector("#weight-area");
  const pointsGroup = document.querySelector("#weight-points");
  const labelsGroup = document.querySelector("#chart-labels");
  const gridGroup = document.querySelector("#chart-grid");

  document.querySelector("#chart-latest-weight").textContent = points.length ? `${round(points.at(-1).value)} kg` : "—";
  const enoughData = points.length >= 2;
  svg.classList.toggle("is-hidden", !enoughData);
  empty.classList.toggle("is-hidden", enoughData);
  if (!enoughData) return;

  const width = 600;
  const height = 220;
  const padding = { top: 18, right: 15, bottom: 35, left: 44 };
  const minRaw = Math.min(...points.map((point) => point.value));
  const maxRaw = Math.max(...points.map((point) => point.value));
  const range = Math.max(maxRaw - minRaw, 1);
  const min = Math.floor((minRaw - range * 0.35) * 2) / 2;
  const max = Math.ceil((maxRaw + range * 0.35) * 2) / 2;
  const plotWidth = width - padding.left - padding.right;
  const plotHeight = height - padding.top - padding.bottom;

  const x = (index) => padding.left + (index / Math.max(1, points.length - 1)) * plotWidth;
  const y = (value) => padding.top + ((max - value) / (max - min)) * plotHeight;
  const path = points.map((point, index) => `${index ? "L" : "M"} ${x(index)} ${y(point.value)}`).join(" ");

  line.setAttribute("d", path);
  area.setAttribute("d", `${path} L ${x(points.length - 1)} ${padding.top + plotHeight} L ${x(0)} ${padding.top + plotHeight} Z`);
  pointsGroup.innerHTML = points
    .map((point, index) => `<circle class="chart-point" cx="${x(index)}" cy="${y(point.value)}" r="4.5"></circle>`)
    .join("");

  const yTicks = [min, min + (max - min) / 2, max];
  gridGroup.innerHTML = yTicks
    .map((tick) => `<line class="chart-grid-line" x1="${padding.left}" x2="${width - padding.right}" y1="${y(tick)}" y2="${y(tick)}"></line>`)
    .join("");
  labelsGroup.innerHTML = [
    ...yTicks.map(
      (tick) =>
        `<text class="chart-axis-label" x="${padding.left - 8}" y="${y(tick) + 3}" text-anchor="end">${round(tick)}</text>`,
    ),
    ...points
      .filter((_, index) => index === 0 || index === points.length - 1 || index === Math.floor((points.length - 1) / 2))
      .map(
        (point, filteredIndex, filtered) => {
          const index = points.indexOf(point);
          const anchor = filteredIndex === 0 ? "start" : filteredIndex === filtered.length - 1 ? "end" : "middle";
          return `<text class="chart-axis-label" x="${x(index)}" y="${height - 8}" text-anchor="${anchor}">${formatDate(point.date)}</text>`;
        },
      ),
  ].join("");
}

function renderAlerts() {
  const recent = Object.values(entries)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 7);
  const messages = [];
  const injury = recent.find((entry) => entry.evening?.injury === "Oui");
  const sick = recent.find((entry) => entry.evening?.sick === "Oui");
  const lowSleep = recent.filter((entry) => Number(entry.morning?.sleepQuality) <= 3 && entry.morning?.sleepQuality).length;

  if (injury) messages.push(`Douleur signalée le ${formatDate(injury.date)}${injury.evening.injuryDetails ? ` : ${injury.evening.injuryDetails}` : ""}.`);
  if (sick) messages.push(`Maladie signalée le ${formatDate(sick.date)}${sick.evening.sickDetails ? ` : ${sick.evening.sickDetails}` : ""}.`);
  if (lowSleep >= 2) messages.push(`${lowSleep} nuits de faible qualité sur les 7 dernières saisies.`);

  const card = document.querySelector("#alert-card");
  card.classList.toggle("is-hidden", !messages.length);
  document.querySelector("#alert-copy").textContent = messages.join(" ");
}

function entryHasAlert(entry) {
  return (
    entry.evening?.injury === "Oui" ||
    entry.evening?.sick === "Oui" ||
    (entry.morning?.sleepQuality && Number(entry.morning.sleepQuality) <= 3)
  );
}

function renderHistory() {
  const query = dom.historySearch.value.trim().toLowerCase();
  const allEntries = Object.values(entries).sort((a, b) => b.date.localeCompare(a.date));
  const filtered = allEntries.filter((entry) => {
    const complete = Boolean(entry.morning && entry.evening);
    if (historyFilter === "complete" && !complete) return false;
    if (historyFilter === "alerts" && !entryHasAlert(entry)) return false;
    if (!query) return true;
    return JSON.stringify(entry).toLowerCase().includes(query) || formatDate(entry.date, { long: true, year: true }).toLowerCase().includes(query);
  });

  document.querySelector("#history-days").textContent = allEntries.length;
  document.querySelector("#history-checkins").textContent = allEntries.reduce(
    (total, entry) => total + Number(Boolean(entry.morning)) + Number(Boolean(entry.evening)),
    0,
  );
  document.querySelector("#history-alerts").textContent = allEntries.filter(entryHasAlert).length;

  dom.historyList.innerHTML = filtered.map(historyCard).join("");
  dom.historyEmpty.classList.toggle("is-hidden", filtered.length > 0);
}

function historyCard(entry) {
  const complete = Boolean(entry.morning && entry.evening);
  const alert = entryHasAlert(entry);
  const notes = [
    entry.evening?.injuryDetails,
    entry.evening?.sickDetails,
    entry.evening?.notes,
  ]
    .filter(Boolean)
    .join(" · ");
  return `
    <article class="history-card">
      <div class="history-card-header">
        <div class="history-date">
          <strong>${escapeHtml(formatDate(entry.date, { weekday: true, long: true }))}</strong>
          <span>${escapeHtml(formatDate(entry.date, { year: true }))}</span>
        </div>
        <div class="history-badges">
          ${alert ? '<span class="status-badge is-alert">Alerte</span>' : ""}
          <span class="status-badge ${complete ? "is-complete" : ""}">${complete ? "Complet" : "Partiel"}</span>
        </div>
      </div>
      <div class="history-card-body">
        <div class="history-stat"><span>Poids</span><strong>${hasValue(entry.morning?.weight) ? `${round(entry.morning.weight)} kg` : "—"}</strong></div>
        <div class="history-stat"><span>Sommeil</span><strong>${entry.morning?.sleepQuality ? `${entry.morning.sleepQuality}/7` : "—"}</strong></div>
        <div class="history-stat"><span>Pas</span><strong>${hasValue(entry.evening?.steps) ? formatNumber(entry.evening.steps) : "—"}</strong></div>
        <div class="history-stat"><span>Training</span><strong>${escapeHtml(entry.evening?.training || entry.workout?.title || "—")}</strong></div>
      </div>
      ${
        entry.workout
          ? `<div class="history-workout"><strong>${escapeHtml(entry.workout.title)} · ${entry.workout.duration} min</strong><span>${entry.workout.exercises.length} exercices · ${escapeHtml(workoutLabels[entry.workout.intensity] || entry.workout.intensity)}</span></div>`
          : ""
      }
      ${notes ? `<div class="history-notes">${escapeHtml(notes)}</div>` : ""}
      <div class="history-card-actions">
        <button type="button" data-edit-morning="${entry.date}">Modifier matin</button>
        <button type="button" data-edit-evening="${entry.date}">Modifier soir</button>
        ${entry.workout ? `<button type="button" data-edit-workout="${entry.date}">Voir séance</button>` : ""}
        <button type="button" data-delete-entry="${entry.date}">Supprimer</button>
      </div>
    </article>
  `;
}

function exportCsv() {
  const headers = [
    "Date",
    "Poids (kg)",
    "Couché",
    "Levé",
    "Sommeil (1-7)",
    "Tension",
    "FC",
    "Glycémie",
    "Phase",
    "Hydratation (L)",
    "Caféine (mg)",
    "Pas",
    "Cardio",
    "Entraînement",
    "Séance générée",
    "Humeur",
    "Énergie",
    "Courbatures",
    "Pump",
    "Performances",
    "Satiété",
    "Stress",
    "Douleur",
    "Précision douleur",
    "Malade",
    "Précision maladie",
    "Digestion",
    "Notes",
  ];
  const rows = Object.values(entries)
    .sort((a, b) => a.date.localeCompare(b.date))
    .map((entry) => [
      entry.date,
      entry.morning?.weight,
      entry.morning?.bedtime,
      entry.morning?.wakeTime,
      entry.morning?.sleepQuality,
      entry.morning?.bloodPressure,
      entry.morning?.heartRate,
      entry.morning?.bloodGlucose,
      entry.evening?.phase,
      entry.evening?.hydration,
      entry.evening?.caffeine,
      entry.evening?.steps,
      entry.evening?.cardio,
      entry.evening?.training,
      entry.workout
        ? `${entry.workout.title} - ${entry.workout.exercises.map((exercise) => `${exercise.name} ${exercise.sets}x${exercise.reps}`).join(" | ")}`
        : "",
      entry.evening?.mood,
      entry.evening?.energy,
      entry.evening?.soreness,
      entry.evening?.pump,
      entry.evening?.performance,
      entry.evening?.satiety,
      entry.evening?.stress,
      entry.evening?.injury,
      entry.evening?.injuryDetails,
      entry.evening?.sick,
      entry.evening?.sickDetails,
      entry.evening?.digestion,
      entry.evening?.notes,
    ]);
  const csv = [headers, ...rows]
    .map((row) => row.map((value) => `"${String(value ?? "").replaceAll('"', '""')}"`).join(";"))
    .join("\n");
  downloadBlob(new Blob([`\ufeff${csv}`], { type: "text/csv;charset=utf-8" }), `prep-log-${todayKey()}.csv`);
  showToast("Export CSV téléchargé");
}

function exportJson() {
  const data = JSON.stringify({ version: 1, exportedAt: new Date().toISOString(), profile, entries }, null, 2);
  downloadBlob(new Blob([data], { type: "application/json" }), `prep-log-sauvegarde-${todayKey()}.json`);
  showToast("Sauvegarde téléchargée");
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.append(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

async function importJson(file) {
  try {
    const parsed = JSON.parse(await file.text());
    if (!parsed || typeof parsed.entries !== "object") throw new Error("Format invalide");
    entries = parsed.entries;
    profile = { ...defaultProfile, ...(parsed.profile || {}) };
    saveEntries();
    saveProfile();
    populateSettings();
    renderDashboard();
    showToast("Sauvegarde restaurée");
  } catch {
    showToast("Impossible de restaurer ce fichier");
  }
}

function populateSettings() {
  Object.entries(profile).forEach(([key, value]) => setField(dom.settingsForm, key, value));
}

function updateConnectionStatus() {
  const status = document.querySelector("#connection-status");
  status.classList.toggle("is-offline", !navigator.onLine);
  status.querySelector("span:last-child").textContent = navigator.onLine ? "Enregistré" : "Hors ligne";
}

function isIosDevice() {
  return /iphone|ipad|ipod/i.test(navigator.userAgent);
}

function isStandaloneMode() {
  return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
}

function configureInstallation() {
  const button = document.querySelector("#install-button");
  const instructions = document.querySelector("#ios-install-instructions");
  const storageStatus = document.querySelector("#storage-status");

  storageStatus.textContent =
    "IndexedDB actif : les saisies sont conservées dans la base locale de cet appareil.";

  if (isStandaloneMode()) {
    button.disabled = true;
    button.textContent = "Application installée";
    instructions.hidden = true;
    return;
  }

  if (isIosDevice()) {
    button.disabled = false;
    button.textContent = "Voir comment installer sur iPhone";
    instructions.hidden = false;
  }
}

function initializeEvents() {
  document.addEventListener("click", (event) => {
    const routeButton = event.target.closest("[data-route]");
    if (routeButton) routeTo(routeButton.dataset.route);

    const ratingButton = event.target.closest(".rating-scale button");
    if (ratingButton) setRating(ratingButton.closest(".rating-scale"), ratingButton.dataset.value);

    const segmentedButton = event.target.closest(".segmented-control button");
    if (segmentedButton) setSegmented(segmentedButton.closest(".segmented-control").dataset.segmented, segmentedButton.dataset.value);

    const editMorning = event.target.closest("[data-edit-morning]");
    if (editMorning) routeTo("morning", { date: editMorning.dataset.editMorning });

    const editEvening = event.target.closest("[data-edit-evening]");
    if (editEvening) routeTo("evening", { date: editEvening.dataset.editEvening });

    const editWorkout = event.target.closest("[data-edit-workout]");
    if (editWorkout) routeTo("workout", { date: editWorkout.dataset.editWorkout });

    const replaceExercise = event.target.closest("[data-replace-exercise]");
    if (replaceExercise) replaceWorkoutExercise(Number(replaceExercise.dataset.replaceExercise));

    const deleteButton = event.target.closest("[data-delete-entry]");
    if (deleteButton && window.confirm(`Supprimer toutes les données du ${formatDate(deleteButton.dataset.deleteEntry, { year: true })} ?`)) {
      delete entries[deleteButton.dataset.deleteEntry];
      saveEntries();
      renderHistory();
      showToast("Journée supprimée");
    }
  });

  dom.morningForm.addEventListener("submit", saveMorning);
  dom.eveningForm.addEventListener("submit", saveEvening);
  document.querySelector("#generate-workout-button").addEventListener("click", buildWorkout);
  document.querySelector("#regenerate-workout-button").addEventListener("click", buildWorkout);
  document.querySelector("#discard-workout-button").addEventListener("click", () => {
    currentWorkout = null;
    dom.workoutResult.classList.add("is-hidden");
    dom.exerciseList.innerHTML = "";
  });
  document.querySelector("#save-workout-button").addEventListener("click", saveWorkout);
  document.querySelector(".accordion-trigger").addEventListener("click", (event) => {
    toggleAccordion(event.currentTarget.getAttribute("aria-expanded") !== "true");
  });
  document.querySelector("#settings-button").addEventListener("click", () => {
    populateSettings();
    dom.settingsDialog.showModal();
  });
  dom.settingsForm.addEventListener("submit", (event) => {
    if (event.submitter?.value !== "save") return;
    const values = formToObject(dom.settingsForm);
    profile = {
      firstName: values.firstName.trim() || defaultProfile.firstName,
      coachName: values.coachName.trim(),
      stepGoal: numberOrNull(values.stepGoal) || defaultProfile.stepGoal,
      hydrationGoal: numberOrNull(values.hydrationGoal) || defaultProfile.hydrationGoal,
    };
    saveProfile();
    renderDashboard();
    showToast("Réglages enregistrés");
  });
  document.querySelector("#export-csv-button").addEventListener("click", exportCsv);
  document.querySelector("#export-json-button").addEventListener("click", exportJson);
  document.querySelector("#import-json-input").addEventListener("change", (event) => {
    const [file] = event.target.files;
    if (file) importJson(file);
    event.target.value = "";
  });
  document.querySelector("#clear-data-button").addEventListener("click", () => {
    if (!window.confirm("Effacer définitivement toutes les saisies ?")) return;
    entries = {};
    saveEntries();
    renderDashboard();
    dom.settingsDialog.close();
    showToast("Toutes les données ont été effacées");
  });
  dom.historySearch.addEventListener("input", renderHistory);
  document.querySelectorAll("[data-filter]").forEach((button) => {
    button.addEventListener("click", () => {
      historyFilter = button.dataset.filter;
      document.querySelectorAll("[data-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderHistory();
    });
  });
  window.addEventListener("online", updateConnectionStatus);
  window.addEventListener("offline", updateConnectionStatus);
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    installPrompt = event;
    const button = document.querySelector("#install-button");
    button.disabled = false;
    button.textContent = "Installer Prep Log";
  });
  document.querySelector("#install-button").addEventListener("click", async () => {
    if (installPrompt) {
      await installPrompt.prompt();
      installPrompt = null;
      document.querySelector("#install-button").disabled = true;
      document.querySelector("#install-button").textContent = "Application installée";
      return;
    }
    if (isIosDevice()) {
      document.querySelector("#ios-install-instructions").scrollIntoView({ behavior: "smooth", block: "center" });
    }
  });
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && location.protocol !== "file:") {
    navigator.serviceWorker.register("./sw.js").catch(() => {});
  }
}

async function initializeApp() {
  buildRatings();
  initializeEvents();
  await loadPersistentData();
  populateSettings();
  updateConnectionStatus();
  configureInstallation();
  const hashRoute = window.location.hash.slice(1);
  routeTo(["morning", "evening", "workout", "history"].includes(hashRoute) ? hashRoute : "home");
  registerServiceWorker();
}

void initializeApp();
