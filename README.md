# FitLife | Fitness Assessment Form

A clean, responsive, multi-step fitness and diet assessment form. Customers fill in their details step by step, and every submission is saved automatically to a Google Sheet, ready for preparing a personalized fitness and nutrition plan.

**Live demo:** https://code-with-pradhyu.github.io/gym-diet-form/

---

## Features

- 5-step form with a progress bar and step counter
- Per-step validation (required fields, number ranges, at least one fitness goal)
- Collects personal details, training experience, dietary preferences, daily routine and fitness goals
- Multi-select checkboxes for protein, carb and fat sources, and goals
- Submissions saved to Google Sheets through Google Apps Script (no server needed)
- Protection against spreadsheet formula injection (values starting with `=`, `+`, `-`, `@` are escaped)
- Fully responsive, works on mobile and desktop
- Success screen after submission

## Form Steps

| Step | Section | What it collects |
|------|---------|------------------|
| 1 | Personal Details | Name, age, gender, weight, height, body fat %, occupation |
| 2 | Fitness & Training | Experience, gym timing, workout days, training split, injuries or health conditions |
| 3 | Dietary Preferences | Diet type, lactose tolerance, allergies, foods liked and avoided, preferred protein, carb and fat sources |
| 4 | Daily Routine | Wake and bed time, meal timings, usual meals |
| 5 | Fitness Goals | Goals, target weight, focus body areas, consent |

## Tech Stack

- HTML5
- CSS3 (custom styling, Google Fonts: DM Sans and Outfit)
- Vanilla JavaScript (no frameworks or libraries)
- Google Apps Script and Google Sheets (backend and storage)
- GitHub Pages (hosting)

## Project Structure

```
gym-diet-form/
├── index.html    # Form markup (5 steps + success screen)
├── style.css     # Styling and responsive layout
├── script.js     # Step navigation, validation, form submission
└── README.md
```

## Run Locally

1. Clone the repository
   ```bash
   git clone https://github.com/code-with-pradhyu/gym-diet-form.git
   cd gym-diet-form
   ```
2. Open `index.html` in your browser, or use the VS Code **Live Server** extension.

## Set Up Your Own Google Sheets Backend

If you want to use this form with your own sheet:

1. Create a Google Sheet and rename the tab to `Customers`.
2. Open **Extensions → Apps Script** and paste your `Code.gs` (with `doPost` and `saveCustomer`). Set `SPREADSHEET_ID` to your sheet's ID (the long string in the sheet URL) and `SHEET_NAME` to `Customers`.
3. Run a test function once to grant permissions.
4. Click **Deploy → New deployment → Web app**:
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web app URL (ending in `/exec`) and paste it into `SCRIPT_URL` in `script.js`.

> **Note:** Every time you change the Apps Script code, you must deploy a **New version** from *Manage deployments*, otherwise the live URL keeps running the old code.

## Deploy on GitHub Pages

1. Push the project to a public GitHub repository.
2. Go to **Settings → Pages**.
3. Set Source to **Deploy from a branch**, branch **main**, folder **/ (root)**, then Save.
4. Your site will be live at `https://<username>.github.io/<repo-name>/`.

## Privacy Note

This form collects personal and health-related information. Keep the Google Sheet private, share it only with people who need access, and do not expose sheet data publicly.

## Author

Built by **Pradhyu** — [Code with Pradhyu](https://github.com/code-with-pradhyu)

If you found this useful, consider giving the repo a star.
