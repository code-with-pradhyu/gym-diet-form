
const form = document.getElementById("fitnessForm");
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwFGLPqIBCURHBXrYSclPSrVG8I9pJocAYOoFeYvwv5ctg6CtPefo_Lpx4UQbBkX3s/exec";

const steps = document.querySelectorAll(".form-step");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");

const progress = document.getElementById("progress");
const stepText = document.getElementById("stepText");
const progressPercent = document.getElementById("progressPercent");

const successScreen = document.getElementById("successScreen");
const formButtons = document.getElementById("formButtons");

let currentStep = 0;

function updateForm() {
  steps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });

  const percent = ((currentStep + 1) / steps.length) * 100;

  progress.style.width = `${percent}%`;
  stepText.textContent = `Step ${currentStep + 1} of ${steps.length}`;
  progressPercent.textContent = `${Math.round(percent)}%`;

  prevBtn.disabled = currentStep === 0;

  nextBtn.textContent =
    currentStep === steps.length - 1
      ? "Submit Assessment ✓"
      : "Next Step →";
}

function validateStep() {
  const currentFields = steps[currentStep].querySelectorAll(
    "input[required], select[required], textarea[required]"
  );

  for (const field of currentFields) {
    if (!field.checkValidity()) {
      field.reportValidity();
      return false;
    }
  }

  // At least one fitness goal must be selected.
  if (currentStep === 4) {
    const selectedGoals = form.querySelectorAll(
      'input[name="goals"]:checked'
    );

    if (selectedGoals.length === 0) {
      alert("Please select at least one fitness goal.");
      return false;
    }
  }

  return true;
}

nextBtn.addEventListener("click", () => {
  if (!validateStep()) return;

  if (currentStep < steps.length - 1) {
    currentStep++;
    updateForm();
    window.scrollTo({ top: 0, behavior: "smooth" });
  } else {
    submitForm();
  }
});

prevBtn.addEventListener("click", () => {
  if (currentStep > 0) {
    currentStep--;
    updateForm();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
});




async function submitForm() {
  const formData = new FormData(form);
  const data = {};

  // Collect all form data
  for (const [key, value] of formData.entries()) {
    if (data[key]) {
      if (!Array.isArray(data[key])) {
        data[key] = [data[key]];
      }

      data[key].push(value);
    } else {
      data[key] = value;
    }
  }

  // Disable button while submitting
  nextBtn.disabled = true;
  nextBtn.textContent = "Submitting...";

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: {
        "Content-Type": "text/plain;charset=utf-8"
      },
      body: JSON.stringify(data)
    });

    console.log("Submission request sent:", data);

    // Show confirmation
    form.querySelectorAll(".form-step").forEach(step => {
      step.style.display = "none";
    });

    formButtons.style.display = "none";

    document.querySelector(".progress-info").style.display = "none";
    document.querySelector(".progress-bar").style.display = "none";

    successScreen.querySelector("p").textContent =
      "Thank you! Your assessment has been submitted.";

    successScreen.classList.add("show");

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  } catch (error) {
    console.error("Submission error:", error);

    alert("Something went wrong. Please try again.");

    nextBtn.disabled = false;
    nextBtn.textContent = "Submit Assessment ✓";
  }
}


updateForm();
