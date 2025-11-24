let rdkitLoaded: unknown = null;

export async function initRDKit() {
  if (rdkitLoaded) return rdkitLoaded;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const RDKit = await (window as any).initRDKitModule({
    locateFile: (file: string) => `/rdkit/${file}`,
  });

  rdkitLoaded = RDKit;
  return RDKit;
}
