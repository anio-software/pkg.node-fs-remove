import {removeFactory as factory} from "#/auto/export/removeFactory.mts"

/* ImplementationDocType is needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#/auto/ImplementationDocType.d.mts"

const impl = factory()

export const remove : ImplementationDocType = impl
