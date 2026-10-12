"use client";

import React, { useState } from "react";
import { soundManager } from "@/utils/sound";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const emailAddress = "christophermathai123@gmail.com";

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      await navigator.clipboard.writeText(emailAddress);
      setCopied(true);
      setShowToast(true);
      soundManager.playSuccess();
      setTimeout(() => setCopied(false), 2400);
      setTimeout(() => setShowToast(false), 3800);
    } catch {
      // Fallback if clipboard API blocked
      soundManager.playClick();
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (status === "error") setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    soundManager.playClick();

    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      setStatus("error");
      setErrorMsg("Please fill in all fields before transmitting.");
      return;
    }

    try {
      setStatus("submitting");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.error || "Failed to dispatch message.");
      }

      setStatus("success");
      soundManager.playSuccess();
      setFormData({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Transmission failed. Please try again.");
    }
  };

  return (
    <section id="contact">
      <div className="contact-eyebrow reveal">Let&apos;s build something</div>
      <h2 className="contact-headline reveal">
        GET IN<br />TOUCH
      </h2>

      {/* Copy Email Interactive Bar */}
      <div className="contact-email-wrapper reveal">
        <a
          href={`mailto:${emailAddress}`}
          className="contact-email"
          onMouseEnter={() => soundManager.playHover()}
        >
          {emailAddress}
        </a>
        <button
          className={`contact-copy-btn ${copied ? "is-copied" : ""}`}
          onClick={handleCopyEmail}
          onMouseEnter={() => soundManager.playHover()}
          type="button"
          aria-label="Copy email address to clipboard"
        >
          <span className="copy-icon" aria-hidden="true">
            {copied ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            )}
          </span>
          <span className="copy-label">{copied ? "COPIED ✓" : "COPY EMAIL"}</span>
        </button>
      </div>

      {/* Interactive Quick Dispatch Form */}
      <div className="contact-form-container reveal">
        <div className="contact-form-header">
          <div className="form-header-tag">
            <span className="tag-pulse" />
            DIRECT TRANSMISSION
          </div>
          <div className="form-header-note">Direct to Christopher&apos;s Inbox</div>
        </div>

        {status === "success" ? (
          <div className="contact-success-state">
            <div className="success-icon">✓</div>
            <h3 className="success-title">TRANSMISSION CONFIRMED</h3>
            <p className="success-desc">
              Your message has been dispatched. Christopher will review and respond shortly.
            </p>
            <button
              type="button"
              className="send-another-btn"
              onClick={() => {
                soundManager.playClick();
                setStatus("idle");
              }}
              onMouseEnter={() => soundManager.playHover()}
            >
              SEND ANOTHER MESSAGE ↺
            </button>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="contact-name" className="form-label">
                  // 01. NAME
                </label>
                <input
                  id="contact-name"
                  type="text"
                  name="name"
                  className="form-input"
                  placeholder="Ada Lovelace"
                  value={formData.name}
                  onChange={handleInputChange}
                  onFocus={() => soundManager.playFocus()}
                  onKeyDown={() => soundManager.playKey()}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="contact-email-input" className="form-label">
                  // 02. EMAIL
                </label>
                <input
                  id="contact-email-input"
                  type="email"
                  name="email"
                  className="form-input"
                  placeholder="ada@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                  onFocus={() => soundManager.playFocus()}
                  onKeyDown={() => soundManager.playKey()}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">
                // 03. MESSAGE / BRIEF
              </label>
              <textarea
                id="contact-message"
                name="message"
                rows={4}
                className="form-textarea"
                placeholder="Tell me about your project, system architecture, or collaboration..."
                value={formData.message}
                onChange={handleInputChange}
                onFocus={() => soundManager.playFocus()}
                onKeyDown={() => soundManager.playKey()}
                required
              />
            </div>

            {status === "error" && (
              <div className="form-error-alert" role="alert">
                <span className="error-icon">!</span> {errorMsg}
              </div>
            )}

            <div className="form-footer">
              <div className="form-status-indicator">
                <span className="indicator-dot" />
                SECURE END-TO-END DISPATCH
              </div>

              <button
                type="submit"
                className={`form-submit-btn ${status === "submitting" ? "is-submitting" : ""}`}
                disabled={status === "submitting"}
                onMouseEnter={() => soundManager.playHover()}
              >
                {status === "submitting" ? (
                  <>
                    <span className="btn-spinner" />
                    TRANSMITTING...
                  </>
                ) : (
                  <>
                    <span>TRANSMIT MESSAGE</span>
                    <span className="btn-arrow">→</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Social and Direct Contact Links */}
      <div className="contact-links reveal">
        <a
          href="https://github.com/Christophermathai"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => soundManager.playHover()}
          onClick={() => soundManager.playClick()}
        >
          GitHub
        </a>
        <a
          href="https://www.instagram.com/christophermathai"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => soundManager.playHover()}
          onClick={() => soundManager.playClick()}
        >
          Instagram
        </a>
        <a
          href="https://www.linkedin.com/in/christopher-mathai-248b6925a/"
          className="contact-link"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => soundManager.playHover()}
          onClick={() => soundManager.playClick()}
        >
          LinkedIn
        </a>
        <a
          href="tel:+919567037933"
          className="contact-link"
          onMouseEnter={() => soundManager.playHover()}
          onClick={() => soundManager.playClick()}
        >
          +91 95670 37933
        </a>
      </div>

      {/* Sleek Floating Toast Notification */}
      <div
        className={`copy-toast ${showToast ? "is-visible" : ""}`}
        role="status"
        aria-live="polite"
      >
        <div className="toast-content">
          <span className="toast-dot" />
          <div className="toast-text-group">
            <span className="toast-title">EMAIL COPIED TO CLIPBOARD</span>
            <span className="toast-desc">{emailAddress}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
