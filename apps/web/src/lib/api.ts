const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8911";

export interface LandlordDto {
  id: string;
  firstName: string;
  lastName: string;
}

export interface UnitDto {
  id: string;
  name: string;
  surface: number;
  furnished: boolean;
  rentAmount: string;
  photoUrl?: string;
  landlords: LandlordDto[];
}

export interface CreateUnitPayload {
  name: string;
  surface: number;
  furnished: boolean;
  rentAmount: number;
  photoUrl?: string;
  landlordIds: string[];
}

function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    return response.json().catch(() => ({})).then((body) => {
      const message = (body as { message?: string }).message ?? response.statusText;
      throw new Error(message);
    });
  }
  return response.json() as Promise<T>;
}

export async function fetchUnits(): Promise<UnitDto[]> {
  const response = await fetch(`${API_BASE_URL}/units`);
  return handleResponse<UnitDto[]>(response);
}

export async function fetchLandlords(): Promise<LandlordDto[]> {
  const response = await fetch(`${API_BASE_URL}/landlords`);
  return handleResponse<LandlordDto[]>(response);
}

export async function createUnit(payload: CreateUnitPayload): Promise<UnitDto> {
  const response = await fetch(`${API_BASE_URL}/units`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return handleResponse<UnitDto>(response);
}

export async function deleteUnit(id: string): Promise<void> {
  const response = await fetch(`${API_BASE_URL}/units/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    const message = (body as { message?: string }).message ?? response.statusText;
    throw new Error(message);
  }
}
