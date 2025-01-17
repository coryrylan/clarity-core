/*
 * Copyright (c) 2016-2022 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { css, html, LitElement } from 'lit';
import { baseStyles, customElement, state } from '@cds/core/internal';
import { DemoGridRow, DemoService } from '@cds/core/demo';
import '@cds/core/grid/register.js';

export function rowAction() {
  @customElement('demo-grid-row-action')
  class DemoRowAction extends LitElement {
    @state() private grid = DemoService.data.grid;
    @state() private activeRow: DemoGridRow;
    @state() private anchor: HTMLElement;

    static styles = [
      baseStyles,
      css`
        :host {
          contain: none;
        }
      `,
    ];

    render() {
      return html` <cds-grid aria-label="row action datagrid demo" height="360">
          <cds-grid-column type="action"></cds-grid-column>
          ${this.grid.columns.map(column => html`<cds-grid-column>${column.label}</cds-grid-column>`)}
          ${this.grid.rows.map(
            row => html` <cds-grid-row>
              <cds-grid-cell>
                <cds-button-action
                  aria-controls="row-actions"
                  aria-label="${row.id} actions"
                  @click=${(e: any) => this.select(e.target, row)}
                ></cds-button-action>
              </cds-grid-cell>
              ${row.cells.map(cell => html`<cds-grid-cell>${cell.label}</cds-grid-cell>`)}
            </cds-grid-row>`
          )}
          <cds-grid-footer></cds-grid-footer>
        </cds-grid>
        <cds-dropdown
          id="row-actions"
          ?hidden=${!this.activeRow}
          .anchor=${this.anchor}
          @closeChange=${() => (this.activeRow = null) as any}
        >
          <div cds-layout="vertical align:stretch">
            ${this.grid.rowActions.map(
              action =>
                html`<cds-button action="flat" size="sm" @click=${() => this.action(action.value, this.activeRow)}
                  >${action.label}</cds-button
                >`
            )}
          </div>
        </cds-dropdown>`;
    }

    private action(action: string, row: DemoGridRow) {
      alert(`${action}: ${row.id}`);
      this.activeRow = null;
    }

    private select(anchor: HTMLElement, row: DemoGridRow) {
      this.activeRow = row;
      this.anchor = anchor;
    }
  }
  return html`<demo-grid-row-action></demo-grid-row-action>`;
}
