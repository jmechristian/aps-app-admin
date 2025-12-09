'use client';

import { useState, useEffect } from 'react';
import { createRegistrant, fetchCompaniesByEventId, fetchAddOnsByEventId, type Company, type AddOn } from '@/app/actions/registrants';

type CreateRegistrantModalProps = {
  eventId: string;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateRegistrantModal({
  eventId,
  isOpen,
  onClose,
  onSuccess,
}: CreateRegistrantModalProps) {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [addOns, setAddOns] = useState<AddOn[]>([]);
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    companyId: '',
    addOnIds: [] as string[],
    jobTitle: '',
    attendeeType: '' as 'OEM' | 'TIER1' | 'SOLUTIONPROVIDER' | 'SPONSOR' | 'SPEAKER' | 'STAFF' | '',
    termsAccepted: false,
    interests: [] as string[],
    otherInterest: '',
    speedNetworking: false,
    speedNetworkingStatus: '',
    billingAddressFirstName: '',
    billingAddressLastName: '',
    billingAddressEmail: '',
    billingAddressPhone: '',
    billingAddressStreet: '',
    billingAddressCity: '',
    billingAddressState: '',
    billingAddressZip: '',
    sameAsAttendee: false,
    speakerTopic: '',
    learningObjectives: '',
    totalAmount: '',
    discountCode: '',
    status: '' as 'PENDING' | 'APPROVED' | 'REJECTED' | '',
    morrisetteTransportation: '',
    morrisetteStatus: '',
    aristoTransportation: '',
    aristoStatus: '',
    magnaTransportation: '',
    magnaStatus: '',
    paymentConfirmation: '',
    registrationEmailSent: false,
    registrationEmailSentDate: '',
    registrationEmailReceived: false,
    registrationEmailReceivedDate: '',
    welcomeEmailSent: false,
    welcomeEmailSentDate: '',
    welcomeEmailReceived: false,
    welcomeEmailReceivedDate: '',
    paymentMethod: '',
    paymentLast4: '',
    approvedAt: '',
    headshot: '',
    presentation: '',
    presentationTitle: '',
    presentationSummary: '',
    bio: '',
  });

  useEffect(() => {
    if (isOpen && eventId) {
      loadData();
    }
  }, [isOpen, eventId]);

  async function loadData() {
    setLoading(true);
    setError(null);
    try {
      const [companiesData, addOnsData] = await Promise.all([
        fetchCompaniesByEventId(eventId),
        fetchAddOnsByEventId(eventId),
      ]);
      setCompanies(companiesData);
      setAddOns(addOnsData);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    if (!formData.attendeeType) {
      setError('Please select an attendee type');
      setSubmitting(false);
      return;
    }

    try {
      await createRegistrant({
        apsID: eventId,
        firstName: formData.firstName || null,
        lastName: formData.lastName || null,
        email: formData.email,
        phone: formData.phone || null,
        companyId: formData.companyId || null,
        jobTitle: formData.jobTitle || null,
        attendeeType: formData.attendeeType as 'OEM' | 'TIER1' | 'SOLUTIONPROVIDER' | 'SPONSOR' | 'SPEAKER' | 'STAFF',
        termsAccepted: formData.termsAccepted || null,
        interests: formData.interests.length > 0 ? formData.interests : null,
        otherInterest: formData.otherInterest || null,
        speedNetworking: formData.speedNetworking || null,
        speedNetworkingStatus: formData.speedNetworkingStatus || null,
        billingAddressFirstName: formData.billingAddressFirstName || null,
        billingAddressLastName: formData.billingAddressLastName || null,
        billingAddressEmail: formData.billingAddressEmail || null,
        billingAddressPhone: formData.billingAddressPhone || null,
        billingAddressStreet: formData.billingAddressStreet || null,
        billingAddressCity: formData.billingAddressCity || null,
        billingAddressState: formData.billingAddressState || null,
        billingAddressZip: formData.billingAddressZip || null,
        sameAsAttendee: formData.sameAsAttendee || null,
        speakerTopic: formData.speakerTopic || null,
        learningObjectives: formData.learningObjectives || null,
        totalAmount: formData.totalAmount ? parseInt(formData.totalAmount) : null,
        discountCode: formData.discountCode || null,
        status: formData.status as 'PENDING' | 'APPROVED' | 'REJECTED',
        morrisetteTransportation: formData.morrisetteTransportation || null,
        morrisetteStatus: formData.morrisetteStatus || null,
        aristoTransportation: formData.aristoTransportation || null,
        aristoStatus: formData.aristoStatus || null,
        magnaTransportation: formData.magnaTransportation || null,
        magnaStatus: formData.magnaStatus || null,
        paymentConfirmation: formData.paymentConfirmation || null,
        registrationEmailSent: formData.registrationEmailSent || null,
        registrationEmailSentDate: formData.registrationEmailSentDate || null,
        registrationEmailReceived: formData.registrationEmailReceived || null,
        registrationEmailReceivedDate: formData.registrationEmailReceivedDate || null,
        welcomeEmailSent: formData.welcomeEmailSent || null,
        welcomeEmailSentDate: formData.welcomeEmailSentDate || null,
        welcomeEmailReceived: formData.welcomeEmailReceived || null,
        welcomeEmailReceivedDate: formData.welcomeEmailReceivedDate || null,
        paymentMethod: formData.paymentMethod || null,
        paymentLast4: formData.paymentLast4 || null,
        approvedAt: formData.approvedAt || null,
        headshot: formData.headshot || null,
        presentation: formData.presentation || null,
        presentationTitle: formData.presentationTitle || null,
        presentationSummary: formData.presentationSummary || null,
        bio: formData.bio || null,
      });

      onSuccess();
      onClose();
      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        companyId: '',
        jobTitle: '',
        attendeeType: '' as 'OEM' | 'TIER1' | 'SOLUTIONPROVIDER' | 'SPONSOR' | 'SPEAKER' | 'STAFF' | '',
        termsAccepted: false,
        interests: [],
        otherInterest: '',
        speedNetworking: false,
        speedNetworkingStatus: '',
        billingAddressFirstName: '',
        billingAddressLastName: '',
        billingAddressEmail: '',
        billingAddressPhone: '',
        billingAddressStreet: '',
        billingAddressCity: '',
        billingAddressState: '',
        billingAddressZip: '',
        sameAsAttendee: false,
        speakerTopic: '',
        learningObjectives: '',
        totalAmount: '',
        discountCode: '',
        status: '' as 'PENDING' | 'APPROVED' | 'REJECTED' | '',
        morrisetteTransportation: '',
        morrisetteStatus: '',
        aristoTransportation: '',
        aristoStatus: '',
        magnaTransportation: '',
        magnaStatus: '',
        paymentConfirmation: '',
        registrationEmailSent: false,
        registrationEmailSentDate: '',
        registrationEmailReceived: false,
        registrationEmailReceivedDate: '',
        welcomeEmailSent: false,
        welcomeEmailSentDate: '',
        welcomeEmailReceived: false,
        welcomeEmailReceivedDate: '',
        paymentMethod: '',
        paymentLast4: '',
        approvedAt: '',
        headshot: '',
        presentation: '',
        presentationTitle: '',
        presentationSummary: '',
        bio: '',
        addOnIds: [],
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create registrant');
    } finally {
      setSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white shadow-2xl">
        <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white px-6 py-4">
          <h2 className="text-2xl font-bold text-slate-900">Create Registrant</h2>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            aria-label="Close"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6">
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 border border-red-200 p-4 text-red-800">
              {error}
            </div>
          )}

          {loading ? (
            <div className="py-8 text-center text-slate-500">Loading companies and addons...</div>
          ) : (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Basic Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Company</label>
                    <select
                      value={formData.companyId}
                      onChange={(e) => setFormData({ ...formData, companyId: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="">Select a company</option>
                      {companies.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Add-Ons</label>
                    <select
                      multiple
                      value={formData.addOnIds}
                      onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, (option) => option.value);
                        setFormData({ ...formData, addOnIds: selected });
                      }}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                      size={3}
                    >
                      {addOns.length > 0 ? (
                        addOns.map((addOn) => (
                          <option key={addOn.id} value={addOn.id}>
                            {addOn.title} - {addOn.date} {addOn.time}
                          </option>
                        ))
                      ) : (
                        <option disabled>No add-ons available for this event</option>
                      )}
                    </select>
                    <p className="mt-1 text-xs text-slate-500">
                      Hold Ctrl/Cmd to select multiple add-ons
                    </p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Job Title
                    </label>
                    <input
                      type="text"
                      value={formData.jobTitle}
                      onChange={(e) => setFormData({ ...formData, jobTitle: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Attendee Type <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.attendeeType}
                      onChange={(e) => setFormData({ ...formData, attendeeType: e.target.value as typeof formData.attendeeType })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="">Select attendee type</option>
                      <option value="OEM">OEM</option>
                      <option value="TIER1">Tier 1</option>
                      <option value="SOLUTIONPROVIDER">Solution Provider</option>
                      <option value="SPONSOR">Sponsor</option>
                      <option value="SPEAKER">Speaker</option>
                      <option value="STAFF">Staff</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Status <span className="text-red-500">*</span>
                    </label>
                    <select
                      required
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value as typeof formData.status })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    >
                      <option value="">Select status</option>
                      <option value="PENDING">Pending</option>
                      <option value="APPROVED">Approved</option>
                      <option value="REJECTED">Rejected</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Additional Fields */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Additional Information</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Discount Code
                    </label>
                    <input
                      type="text"
                      value={formData.discountCode}
                      onChange={(e) => setFormData({ ...formData, discountCode: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Total Amount
                    </label>
                    <input
                      type="number"
                      value={formData.totalAmount}
                      onChange={(e) => setFormData({ ...formData, totalAmount: e.target.value })}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Bio</label>
                    <textarea
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      rows={3}
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-slate-900">Billing Address</h3>
                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={formData.billingAddressFirstName}
                      onChange={(e) =>
                        setFormData({ ...formData, billingAddressFirstName: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={formData.billingAddressLastName}
                      onChange={(e) =>
                        setFormData({ ...formData, billingAddressLastName: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                    <input
                      type="email"
                      value={formData.billingAddressEmail}
                      onChange={(e) =>
                        setFormData({ ...formData, billingAddressEmail: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                    <input
                      type="tel"
                      value={formData.billingAddressPhone}
                      onChange={(e) =>
                        setFormData({ ...formData, billingAddressPhone: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-slate-700 mb-1">Street</label>
                    <input
                      type="text"
                      value={formData.billingAddressStreet}
                      onChange={(e) =>
                        setFormData({ ...formData, billingAddressStreet: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">City</label>
                    <input
                      type="text"
                      value={formData.billingAddressCity}
                      onChange={(e) =>
                        setFormData({ ...formData, billingAddressCity: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">State</label>
                    <input
                      type="text"
                      value={formData.billingAddressState}
                      onChange={(e) =>
                        setFormData({ ...formData, billingAddressState: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1">ZIP</label>
                    <input
                      type="text"
                      value={formData.billingAddressZip}
                      onChange={(e) =>
                        setFormData({ ...formData, billingAddressZip: e.target.value })
                      }
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 focus:border-slate-900 focus:outline-none focus:ring-2 focus:ring-slate-900"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.sameAsAttendee}
                        onChange={(e) =>
                          setFormData({ ...formData, sameAsAttendee: e.target.checked })
                        }
                        className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                      />
                      <span className="text-sm font-medium text-slate-700">
                        Same as attendee
                      </span>
                    </label>
                  </div>
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-2">
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.termsAccepted}
                    onChange={(e) =>
                      setFormData({ ...formData, termsAccepted: e.target.checked })
                    }
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-sm font-medium text-slate-700">Terms Accepted</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.speedNetworking}
                    onChange={(e) =>
                      setFormData({ ...formData, speedNetworking: e.target.checked })
                    }
                    className="rounded border-slate-300 text-slate-900 focus:ring-slate-900"
                  />
                  <span className="text-sm font-medium text-slate-700">Speed Networking</span>
                </label>
              </div>
            </div>
          )}

          <div className="mt-6 flex justify-end gap-3 border-t border-slate-200 pt-6">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting || loading}
              className="rounded-lg bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Creating...' : 'Create Registrant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

