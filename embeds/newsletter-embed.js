/**
 * AI Prod Weekly - Embeddable Newsletter Signup
 * Add this to any product site to capture newsletter subscribers
 *
 * Usage:
 *   <div id="aipw-signup" data-source="learningai"></div>
 *   <script src="https://aiprodweekly.com/embeds/newsletter-embed.js"></script>
 *
 * Analytics tracked:
 *   - view: form rendered on page
 *   - focus: user clicked email input
 *   - submit: form submitted
 *   - success: signup completed
 *   - error: signup failed
 *   - exists: already subscribed
 */

(function() {
  const SUPABASE_URL = 'https://xitfncljhfdqvnzakbwl.supabase.co';
  const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhpdGZuY2xqaGZkcXZuemFrYndsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ0NjM0ODYsImV4cCI6MjA4MDAzOTQ4Nn0.-p64B2Qjn_vOzy-QKIGoNgGFcfysm-7ozTUl_zgspcQ';

  // Analytics tracking function
  function trackEvent(event, source, metadata = {}) {
    try {
      // Fire-and-forget analytics
      fetch(SUPABASE_URL + '/rest/v1/newsletter_analytics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPABASE_ANON_KEY,
          'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify({
          event: event,
          source: source,
          page_url: window.location.href,
          referrer: document.referrer || null,
          user_agent: navigator.userAgent,
          metadata: metadata
        })
      }).catch(function() {}); // Silently ignore errors
    } catch (e) {
      // Analytics should never break the form
    }
  }

  // Find all signup containers
  const containers = document.querySelectorAll('[id="aipw-signup"], [data-aipw-signup]');

  containers.forEach(function(container) {
    const source = container.dataset.source || 'embed';
    const theme = container.dataset.theme || 'light';
    const compact = container.dataset.compact === 'true';
    const headline = container.dataset.headline || 'Get AI productivity tips weekly';
    const buttonText = container.dataset.button || 'Subscribe Free';

    // Generate unique ID for this form
    const formId = 'aipw-' + Math.random().toString(36).substr(2, 9);

    // Inject styles (only once)
    if (!document.getElementById('aipw-styles')) {
      const styles = document.createElement('style');
      styles.id = 'aipw-styles';
      styles.textContent = `
        .aipw-container {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          max-width: 100%;
        }
        .aipw-container.aipw-dark {
          --aipw-bg: #1a1a1a;
          --aipw-text: #ffffff;
          --aipw-muted: #a0a0a0;
          --aipw-border: #333;
          --aipw-input-bg: #2a2a2a;
          --aipw-primary: #3b82f6;
          --aipw-primary-hover: #2563eb;
        }
        .aipw-container.aipw-light {
          --aipw-bg: #ffffff;
          --aipw-text: #1a1a1a;
          --aipw-muted: #666;
          --aipw-border: #e5e5e5;
          --aipw-input-bg: #ffffff;
          --aipw-primary: #2563eb;
          --aipw-primary-hover: #1d4ed8;
        }
        .aipw-box {
          background: var(--aipw-bg);
          border: 1px solid var(--aipw-border);
          border-radius: 12px;
          padding: 1.5rem;
        }
        .aipw-headline {
          color: var(--aipw-text);
          font-size: 1.125rem;
          font-weight: 600;
          margin: 0 0 1rem 0;
          line-height: 1.4;
        }
        .aipw-compact .aipw-headline {
          font-size: 1rem;
          margin-bottom: 0.75rem;
        }
        .aipw-form {
          display: flex;
          gap: 0.5rem;
        }
        .aipw-compact .aipw-form {
          flex-direction: row;
        }
        .aipw-input {
          flex: 1;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          border: 1px solid var(--aipw-border);
          border-radius: 8px;
          background: var(--aipw-input-bg);
          color: var(--aipw-text);
          outline: none;
        }
        .aipw-input:focus {
          border-color: var(--aipw-primary);
        }
        .aipw-input::placeholder {
          color: var(--aipw-muted);
        }
        .aipw-button {
          padding: 0.75rem 1.25rem;
          font-size: 1rem;
          font-weight: 600;
          color: white;
          background: var(--aipw-primary);
          border: none;
          border-radius: 8px;
          cursor: pointer;
          white-space: nowrap;
          transition: background 0.2s;
        }
        .aipw-button:hover {
          background: var(--aipw-primary-hover);
        }
        .aipw-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .aipw-trust {
          color: var(--aipw-muted);
          font-size: 0.8rem;
          margin-top: 0.75rem;
        }
        .aipw-success {
          color: #16a34a;
          font-weight: 600;
        }
        .aipw-error {
          color: #dc2626;
        }
        .aipw-already {
          color: var(--aipw-primary);
        }
        @media (max-width: 480px) {
          .aipw-form {
            flex-direction: column;
          }
          .aipw-button {
            width: 100%;
          }
        }
      `;
      document.head.appendChild(styles);
    }

    // Build form HTML
    const html = `
      <div class="aipw-container aipw-${theme} ${compact ? 'aipw-compact' : ''}">
        <div class="aipw-box">
          <h3 class="aipw-headline">${headline}</h3>
          <form class="aipw-form" id="${formId}">
            <input type="email" class="aipw-input" placeholder="you@example.com" required>
            <button type="submit" class="aipw-button">${buttonText}</button>
          </form>
          <p class="aipw-trust" id="${formId}-msg">No spam. Unsubscribe anytime.</p>
        </div>
      </div>
    `;

    container.innerHTML = html;

    // Track form view
    trackEvent('view', source, { formId: formId });

    // Handle form submission
    const form = document.getElementById(formId);
    const msgEl = document.getElementById(formId + '-msg');
    const input = form.querySelector('input');

    // Track input focus (user engagement)
    let focusTracked = false;
    input.addEventListener('focus', function() {
      if (!focusTracked) {
        trackEvent('focus', source, { formId: formId });
        focusTracked = true;
      }
    });

    form.addEventListener('submit', async function(e) {
      e.preventDefault();
      const email = input.value;
      const button = form.querySelector('button');

      // Track form submission
      trackEvent('submit', source, { formId: formId });

      button.disabled = true;
      button.textContent = 'Subscribing...';

      try {
        const response = await fetch(SUPABASE_URL + '/rest/v1/newsletter_subscribers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'apikey': SUPABASE_ANON_KEY,
            'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            email: email,
            source: source
          })
        });

        if (response.ok || response.status === 201) {
          // Track successful signup
          trackEvent('success', source, { formId: formId });
          form.innerHTML = '<p class="aipw-success">You\'re in! Check your inbox Thursday.</p>';
          msgEl.style.display = 'none';
        } else if (response.status === 409) {
          // Track already exists
          trackEvent('exists', source, { formId: formId });
          msgEl.textContent = 'You\'re already subscribed!';
          msgEl.className = 'aipw-trust aipw-already';
          button.disabled = false;
          button.textContent = '${buttonText}';
        } else {
          throw new Error('Signup failed');
        }
      } catch (error) {
        // Track error
        trackEvent('error', source, { formId: formId, error: error.message || 'Unknown error' });
        msgEl.textContent = 'Something went wrong. Please try again.';
        msgEl.className = 'aipw-trust aipw-error';
        button.disabled = false;
        button.textContent = '${buttonText}';
      }
    });
  });
})();
