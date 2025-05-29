# Tasks

## Github Behaviour

You are the Stratonea senior Software Engineer/Developer mentoring a junior developer (me -> Benjamin). I’m learning to code and I want to understand the structure of my project by copying and pasting whole working files at each step.

1. My goal is to learn slowly, step by step. Here’s how I want us to work:
2. Guide me one file at a time. For every step:
    - Tell me clearly which file to edit.
    - Show me the entire updated version of the file, not just code snippets or lines to insert.
    - Include code comments to explain what each section does.
    - Make sure each file you give me can be copy-pasted wholesale and will still work. When editing existing code, use comments to clearly mark the changes you made  <!-- ===== [New Feature] START ===== --> and <!-- ===== [New Feature] END ===== -->.
3. Avoid rushing. Think of this like a teaching session. Only move to the next file after you’ve fully explained the current one and confirmed that it works.
4. Do you understand?

## VAT Mechanism Implementation Tasks

### 1. Data Structure

- [ ] Add a `vatType` field to your invoice data.
- [ ] Add fields to track `vatAmount` and `total`.

### 2. UI

- [ ] Create a dropdown or radio input for selecting VAT type:
  - None
  - Flat Rate (4%)
  - Standard Rate (21.5%)
- [ ] Default the VAT selection to "None".

### 3. Logic

- [ ] Write logic to calculate VAT based on selection:
  - None → subtotal × 1
  - Flat → subtotal × 0.04
  - Standard → subtotal × 0.215
- [ ] Ensure the VAT amount and total are recalculated whenever `subtotal` or `vatType` changes.

### 4. Display

- [ ] Show calculated VAT and total amount on the invoice summary.
- [ ] Format VAT label to reflect selected rate (e.g., "VAT (4%)").

### 5. Persistence

- [ ] Ensure VAT selection and calculation are saved in local forage
- [ ] Ensure VAT details appear in PDF/exported invoice

### Help me implement the vat mechanism

the vat calculation is 3 options for the business in ghana

1. none -> multiply the subtotal X 1 (None)
4% -> multiply subtotal X 0.04(Flat Rate)
21.5% -> multiply subtotal X 0.215 (standard rate)
Default should be none

------------------------------------ Above  Done

## 1. Invoice Preview Component

- [ ] Create a dedicated `<InvoicePreview />` component.
  - [ ] Accepts all invoice data as props (including logo).
  - [ ] Renders invoice in a printable, mobile-friendly layout.
  - [ ] Uses only Tailwind utility classes for styling.
  - [ ] Handles missing data gracefully (shows placeholders).
  - [ ] Supports offline rendering (no external dependencies for preview).

- [ ] Integrate `<InvoicePreview />` into your main invoice view.
  - [ ] Pass current invoice data and logo as props.
  - [ ] Place preview below the invoice form.

## 2. PDF Download Functionality

- [ ] Install and configure `html2pdf.js` (or similar) for PDF export.
  - [ ] Add as a dependency: `npm install html2pdf.js`
  - [ ] Import and use only when needed (lazy load for performance).

- [ ] Add a **Download PDF** button.
  - [ ] Button is large enough for touch (min 48x48px).
  - [ ] Button is visible only when invoice data is valid.

- [ ] Implement PDF generation logic:
  - [ ] Target the Invoice Preview section by `id` or `ref`.
  - [ ] Generate PDF from the preview HTML.
  - [ ] Save/download PDF with a clear filename (e.g., `Invoice-<number>.pdf`).
  - [ ] Show loading state while generating PDF.
  - [ ] Handle errors with simple, clear messages.
  - [ ] Show a toast or alert after successful PDF download or WhatsApp share.
  - [ ] Show a loading spinner or message during PDF generation.

---

## 3. WhatsApp Sharing Integration

- [ ] Add a **Share via WhatsApp** button.  
  - [ ] Button is touch-optimized and accessible.
  - [ ] Button is visible only when invoice data is valid.

- [ ] Implement WhatsApp sharing logic:
  - [ ]Share invoice summary as text (always works, no file upload).

- [ ] Use Stratonea’s WhatsApp link generator utility for text sharing:
  - [ ] Format invoice summary for WhatsApp (clear, simple, Ghana-friendly).
  - [ ] Open WhatsApp with pre-filled message.
  - [ ] Show a toast or alert after successful PDF download or WhatsApp share.
  - [ ] Show a loading spinner or message during PDF generation.

## 4. Offline-First & Mobile-First Testing

- [ ] Test all features on mobile (Android preferred).
- [ ] Test PDF generation and WhatsApp sharing while offline (should show clear error or fallback).
- [ ] Ensure all buttons and touch targets are at least 48x48px.
- [ ] Confirm all error messages are in simple English with recovery steps.

---

## 5. Documentation & Code Quality

- [ ] Add file-level and function-level comments explaining each section.
- [ ] Use clear section headers in all files.
- [ ] Follow Stratonea naming conventions and Tailwind usage guidelines.
- [ ] Ensure all code is modular, minimal, and focused on the current task.
