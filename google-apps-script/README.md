# Talent Search Exam → Google Sheet

The Talent Search Exam on the website sends each submission to a Google Apps
Script, which scores it and adds a row to the response sheet.

Response sheet: **Radha Krishna Gurukulam - Talent Search Exam Responses**
https://docs.google.com/spreadsheets/d/1Xz1QzIMHtFbSURzjAOaPinkEG4ezzKN3C-xXVZGMpEo/edit

## One-time setup (about 5 minutes)

1. Open the response sheet above.
2. **Extensions → Apps Script**. Delete the sample code and paste in the whole
   of `talent-search-exam.gs` from this folder. Click **Save**.
3. **Deploy → New deployment**. Click the gear next to "Select type" and pick
   **Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**, then **Authorize access** and allow it with the Google
   account that owns the sheet. (Google may warn that the app is unverified:
   click **Advanced → Go to … (unsafe)**. It is your own script.)
5. Copy the **Web app URL** (it ends in `/exec`).
6. In `index.html`, paste it between the quotes of
   `var TSE_ENDPOINT='';` and publish the site.

Until step 6 is done, the **Start Test** button on the website shows
"The online test is not open yet".

## Changing the questions or answer key

- Question text and options: `QUESTIONS` in the Talent Search script near the
  end of `index.html`.
- Correct answers: `ANSWER_KEY` in `talent-search-exam.gs`. After editing it in
  Apps Script, use **Deploy → Manage deployments → Edit → Version: New version
  → Deploy** so the live URL picks up the change (the URL stays the same).

The answer key is kept only in Apps Script so students cannot see it in the
website's page source.
