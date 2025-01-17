/*
 * Copyright (c) 2016-2022 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { html } from 'lit';
import { createTestElement, removeTestElement, componentIsStable } from '@cds/core/test';
import { getCssPropertyValue } from '@cds/core/internal';
import { CdsRange } from '@cds/core/range';
import '@cds/core/range/register.js';

describe('cds-range', () => {
  let component: CdsRange;
  let element: HTMLElement;

  beforeEach(async () => {
    element = await createTestElement(html`
      <cds-range>
        <label>range</label>
        <input type="range" />
        <cds-control-message>message test</cds-control-message>
      </cds-range>
    `);

    component = element.querySelector<CdsRange>('cds-range');
  });

  afterEach(() => {
    removeTestElement(element);
  });

  it('should create component', async () => {
    await componentIsStable(component);
    expect(component).toBeTruthy();
  });

  it('should set the track width style', async () => {
    await componentIsStable(component);
    expect(getCssPropertyValue('--track-width', component)).toBe('50%');

    component.inputControl.min = '1';
    component.inputControl.max = '10';
    component.inputControl.value = '7.5';
    component.inputControl.dispatchEvent(new Event('input'));

    await componentIsStable(component);
    expect(getCssPropertyValue('--track-width', component)).toBe('77%');
  });

  it('should update the track width style when the value is changed programmatically (no input event)', async () => {
    await componentIsStable(component);
    expect(getCssPropertyValue('--track-width', component)).toBe('50%');

    component.inputControl.value = '75';

    await componentIsStable(component);
    expect(getCssPropertyValue('--track-width', component)).toBe('75%');
  });
});
