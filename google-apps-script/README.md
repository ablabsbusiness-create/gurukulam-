# Talent Search Exam registrations → Google Sheet

The Talent Search Exam form on the website only collects the student's
contact details (no test is taken online). Each registration is sent to a
Google Apps Script, which adds a row to the "Registrations" tab of the
response sheet.

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

Until step 6 is done, the website sends each registration to the institute
on WhatsApp (8573000541) instead.

If the script was deployed before (for the old online test), paste the new
code over it and use **Deploy → Manage deployments → Edit → Version: New
version → Deploy** so the existing URL picks up the change.
