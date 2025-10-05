import { render, screen, waitFor, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { vi } from "vitest";
import UnitList from "./index";
import {
  fetchUnits,
  fetchLandlords,
  createUnit,
  deleteUnit,
  type UnitDto,
  type LandlordDto,
} from "../../lib/api";

vi.mock("../../lib/api");

describe("<UnitList />", () => {
  const landlordJulien: LandlordDto = {
    id: "landlord-1",
    firstName: "Julien",
    lastName: "Martin",
  };

  const landlordCamille: LandlordDto = {
    id: "landlord-2",
    firstName: "Camille",
    lastName: "Dupont",
  };

  const baseUnit: UnitDto = {
    id: "unit-1",
    name: "Studio Le Marais",
    surface: 28,
    furnished: true,
    rentAmount: "1150.00",
    photoUrl: "https://example.com/studio.jpg",
    landlords: [landlordJulien, landlordCamille],
  };

  afterEach(() => {
    vi.clearAllMocks();
  });

  it("renders units after loading data", async () => {
    vi.mocked(fetchUnits).mockResolvedValue([baseUnit]);
    vi.mocked(fetchLandlords).mockResolvedValue([
      landlordJulien,
      landlordCamille,
    ]);

    render(<UnitList />);

    expect(screen.getByText("Chargement des biens...")).toBeInTheDocument();

    await waitFor(() => expect(fetchUnits).toHaveBeenCalledTimes(1));

    expect(screen.getByText("Studio Le Marais")).toBeInTheDocument();
    expect(screen.getByText(/Julien Martin/)).toBeInTheDocument();
    expect(
      screen.queryByText("Chargement des biens...")
    ).not.toBeInTheDocument();
  });

  it("allows adding a new unit through the modal", async () => {
    vi.mocked(fetchUnits).mockResolvedValue([baseUnit]);
    vi.mocked(fetchLandlords).mockResolvedValue([
      landlordJulien,
      landlordCamille,
    ]);

    const createdUnit: UnitDto = {
      id: "unit-2",
      name: "Duplex Canal",
      surface: 80,
      furnished: false,
      rentAmount: "2500.00",
      photoUrl: undefined,
      landlords: [landlordJulien],
    };

    vi.mocked(createUnit).mockResolvedValue(createdUnit);

    render(<UnitList />);

    await screen.findByText("Studio Le Marais");

    await userEvent.click(screen.getByText("Ajouter un bien"));

    const modal = await screen.findByRole("dialog");

    await userEvent.type(
      within(modal).getByLabelText("Nom du bien"),
      "3p Batignolles"
    );
    await userEvent.type(within(modal).getByLabelText("Surface (m²)"), "80");
    await userEvent.type(
      within(modal).getByLabelText("Loyer (€/mois)"),
      "2500"
    );
    await userEvent.type(
      within(modal).getByPlaceholderText("https://"),
      "https://example.com/3p-batignolles.jpg"
    );

    await userEvent.click(within(modal).getByLabelText("Julien Martin"));

    await userEvent.click(
      within(modal).getByRole("button", { name: "Enregistrer" })
    );

    await waitFor(() =>
      expect(createUnit).toHaveBeenCalledWith({
        name: "3p Batignolles",
        surface: 80,
        furnished: true,
        rentAmount: 2500,
        photoUrl: "https://example.com/3p-batignolles.jpg",
        landlordIds: [landlordJulien.id],
      })
    );

    await screen.findByText("Duplex Canal");
  });

  it("removes a unit when deleting succeeds", async () => {
    vi.mocked(fetchUnits).mockResolvedValue([baseUnit]);
    vi.mocked(fetchLandlords).mockResolvedValue([landlordJulien]);
    vi.mocked(deleteUnit).mockResolvedValue();

    render(<UnitList />);

    await screen.findByText("Studio Le Marais");

    await userEvent.click(screen.getByRole("button", { name: "Supprimer" }));

    await waitFor(() => expect(deleteUnit).toHaveBeenCalledWith(baseUnit.id));
    await waitFor(() =>
      expect(screen.queryByText("Studio Le Marais")).not.toBeInTheDocument()
    );
  });
});
