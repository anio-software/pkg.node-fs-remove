import {removeSyncFactory as factory} from "#~auto/export/removeSyncFactory.mts"

/* ImplementationDocType is needed to make doctypes work in LSP */
import type {ImplementationDocType} from "#~auto/ImplementationSyncDocType.d.mts"

const impl = factory()

export const removeSync : ImplementationDocType = impl
