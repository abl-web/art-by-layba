# Art by Layba — CMS Setup Guide

## How the CMS works

The CMS is powered by **Sveltia CMS** (a modern drop-in for Decap/Netlify CMS).  
It edits three JSON files in `src/content/`:

| File | What it controls |
|------|-----------------|
| `site.json` | Everything — hero, about, nav, footer, contact, gallery settings, commissions section |
| `artworks.json` | Every artwork in the gallery |
| `commissions.json` | Commission packages |

Every save in the CMS commits those JSON files to GitHub. Netlify detects the commit, rebuilds the site, and deploys it — usually within 60 seconds.

---

## One-time setup on Netlify

### 1. Enable Netlify Identity
1. In the Netlify dashboard → **Site settings → Identity**
2. Click **Enable Identity**
3. Under **Registration**, choose **Invite only**
4. Under **Services → Git Gateway**, click **Enable Git Gateway**

### 2. Invite yourself as editor
In **Identity → Invite users**, enter Layba's email address.  
She'll receive an email to set a password — that's her CMS login.

### 3. Access the CMS
The CMS is at **https://your-site.netlify.app/admin**  
Log in with the email and password from the invitation.

---

## What every section controls

### Global Settings
- Artist name, site title, logo, tagline
- SEO title and description
- Contact email, Instagram, location
- Navigation links and CTA button
- Copyright and footer text

### Hero Section
- Eyebrow label, heading, subheading
- Hero background image + alt text
- Primary and secondary button labels and destinations
- Visibility toggle

### About Section
- Section title and subtitle
- Full artist biography (blank lines = new paragraphs)
- Education, medium, location
- **About Image 1** (portrait photo) + alt text
- **About Image 2** (studio photo) + alt text
- Visibility toggle

### Gallery Settings
- Gallery heading and intro text
- Whether filter buttons are shown
- Visibility toggle

### Artworks Collection
Each artwork has:
- Image + alt text
- Title, medium, dimensions, year, price
- **Status** — Available / Sold / Private (dropdown, not a checkbox)
- Featured flag
- Visible flag (hide without deleting)
- Short and full descriptions
- Sort order
- Enquiry button text

### Commission Packages
Each package has:
- Name, image, price + price label
- Description, what's included
- Size, medium, revisions, turnaround
- Availability status (dropdown)
- Button label + destination
- Sort order and visibility

### Contact Section
- Heading, intro text
- Email address
- Instagram URL + label
- Email subject line (prefilled when visitor clicks email)

### Footer
- Artist name, tagline, location, email, Instagram
- Description text, copyright text, quote
- Footer navigation links

---

## Adding a new artwork

1. Go to **🖼 Artworks → Artwork Collection**
2. Scroll to the bottom of the list and click **Add item**
3. Fill in all fields — ID should be something like `painting-19`
4. Set Status to **Available**
5. Set Visible to **on**
6. Click **Save** — the site rebuilds in ~60 seconds

## Changing an artwork's status to Sold

1. Find the artwork in **🖼 Artworks**
2. Change **Status** from `Available` to `Sold`
3. Save — the gallery badge and filters update automatically

## Replacing an image

1. Click the image field in the CMS
2. Upload the new file
3. Save — the live site updates after rebuild

---

## Image uploads

New uploads go into `public/images/` in the repository.  
They appear on the live site after the next Netlify build.

Always fill in the **alt text** field — it's required for accessibility and SEO.

