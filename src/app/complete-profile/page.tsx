'use client';

import { Icon } from '@iconify/react';
import { Button } from '@/components/shared/button';
import { TextInputField } from '@/components/shared/text-input-field';
import { Typography } from '@/components/shared/typography';
import { CompleteProfileLayout, ProfileFormCard } from '@/components/profile/complete-profile';

export default function CompleteProfilePage() {
  return (
    <CompleteProfileLayout>
      <ProfileFormCard title="Basic Information">
        <form
          className="flex flex-col gap-6"
          onSubmit={(event) => event.preventDefault()}
        >
          <div className="grid gap-4 sm:grid-cols-1">
            <TextInputField
              id="first-name"
              label="First Name"
              placeholder="Enter your first name"
            />
          </div>

          <TextInputField
            id="email"
            label="Email Address"
            placeholder="Enter your email"
            type="email"
          />

          <div className="flex flex-col gap-1">
            <Typography as="label" size="sm" className="text-dark-gray">
              Phone Number*
            </Typography>
            <div className="flex h-[48px] items-center rounded-[16px] border border-soft-gray bg-white">
              <div className="flex items-center gap-2 border-r border-soft-gray px-3 text-sm text-dark-gray">
                <span>AU</span>
                <Icon icon="mdi:chevron-down" className="h-4 w-4" />
              </div>
              <input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                className="flex-1 px-3 text-sm text-dark-gray outline-none"
              />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <Typography as="label" size="sm" className="text-dark-gray">
              Specialty
            </Typography>
            <div className="flex min-h-[48px] flex-wrap items-center gap-2 rounded-[16px] border border-soft-gray px-3 py-2">
              {['General', 'Pediatrics'].map((item) => (
                <span
                  key={item}
                  className="flex items-center gap-2 rounded-full border border-light-blue px-3 py-1 text-sm text-dark-gray"
                >
                  <Icon icon="mdi:close" className="h-4 w-4 text-primary-gray" />
                  {item}
                </span>
              ))}
              <button
                type="button"
                className="ml-auto flex items-center gap-1 text-sm text-secondary-gray"
              >
                Add specialty
                <Icon icon="mdi:chevron-down" className="h-4 w-4" />
              </button>
            </div>
          </div>

          <TextInputField
            id="location"
            label="Primary Location"
            placeholder="Enter your preferred location"
          />

          <div className="flex flex-col gap-1">
            <Typography as="label" size="sm" className="text-dark-gray">
              Profile Bio
            </Typography>
            <textarea
              id="bio"
              placeholder="Enter bio (max 500 characters)"
              className="min-h-[120px] rounded-[16px] border border-soft-gray px-4 py-3 text-sm text-dark-gray outline-none"
            />
          </div>

          <Button variant="primary" size="default" className="bg-light-blue">
            Save &amp; Continue
          </Button>
        </form>
      </ProfileFormCard>
    </CompleteProfileLayout>
  );
}
