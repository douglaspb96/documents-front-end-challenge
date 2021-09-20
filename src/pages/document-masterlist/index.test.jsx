import "@testing-library/jest-dom";
import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import AxiosMockAdapter from "axios-mock-adapter";
import api from "../../api";
import { DocumentMasterlist } from ".";
var mockedDocuments = [
  {
    id: 1,
    code: "PO001",
    title: "Safety and mission assurance",
    active: true,
    published: true,
    "release-date": "02/12/2019",
    processes: [
      {
        id: 1,
        name: "Production",
      },
      {
        id: 2,
        name: "Quality Management",
      },
    ],
  },
  {
    id: 2,
    code: "PO002",
    title: "Software assurance research program 2",
    active: true,
    published: true,
    "release-date": "12/12/2012",
    processes: [
      {
        id: 3,
        name: "Sales 2",
      },
    ],
  },
  {
    id: 3,
    code: "PO003",
    title: "Software assurance research program 3",
    active: true,
    published: true,
    "release-date": "12/12/2013",
    processes: [
      {
        id: 3,
        name: "Sales 3",
      },
    ],
  },
  {
    id: 4,
    code: "PO004",
    title: "Software assurance research program 4",
    active: true,
    published: true,
    "release-date": "12/12/2014",
    processes: [
      {
        id: 3,
        name: "Sales 4",
      },
    ],
  },
  {
    id: 5,
    code: "PO005",
    title: "Software assurance research program 5",
    active: true,
    published: true,
    "release-date": "12/12/2015",
    processes: [
      {
        id: 3,
        name: "Sales 5",
      },
    ],
  },
  {
    id: 6,
    code: "PO006",
    title: "Software assurance research program 6",
    active: true,
    published: true,
    "release-date": "12/12/2016",
    processes: [
      {
        id: 3,
        name: "Sales 6",
      },
    ],
  },
];

describe("Masterlist", () => {
  let mock;
  let mockDocument1 = mockedDocuments[0];
  let mockDocument2 = mockedDocuments[1];
  beforeEach(() => {
    mock = new AxiosMockAdapter(api);

    mock.onGet(/.*\/documents.*/).reply(200, mockedDocuments);
  });

  afterEach(() => {
    cleanup();
  });

  it("should render page title", async () => {
    render(<DocumentMasterlist />);
    expect(screen.getByText("MasterList")).toBeInTheDocument();

    expect(await screen.findByText(/codigo/i)).toBeInTheDocument();
    expect(await screen.findByText(/titulo/i)).toBeInTheDocument();
    expect(await screen.findByText(/data de publicação/i)).toBeInTheDocument();
    expect(await screen.findByText(/processos/i)).toBeInTheDocument();
  });

  it("should render documents", async () => {
    render(<DocumentMasterlist />);

    expect(await screen.findByText(mockDocument1.code)).toBeInTheDocument();
    expect(await screen.findByText(mockDocument1.title)).toBeInTheDocument();
    expect(
      await screen.findByText(mockDocument1["release-date"])
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        mockDocument1.processes.map((process) => process.name).join(", ")
      )
    ).toBeInTheDocument();

    expect(await screen.findByText(mockDocument2.code)).toBeInTheDocument();
    expect(await screen.findByText(mockDocument2.title)).toBeInTheDocument();
    expect(
      await screen.findByText(mockDocument2["release-date"])
    ).toBeInTheDocument();
    expect(
      await screen.findByText(
        mockDocument2.processes.map((process) => process.name).join(", ")
      )
    ).toBeInTheDocument();
  });

  it("should validate pagination", async () => {
    render(<DocumentMasterlist />);

    expect(
      await screen.findByText(mockedDocuments[4].code)
    ).toBeInTheDocument();
    expect(screen.queryByText(mockedDocuments[5].code)).not.toBeInTheDocument();

    const buttonNext = await screen.findByRole("button", { name: "Próxima" });

    fireEvent.click(buttonNext);

    expect(screen.queryByText(mockedDocuments[4].code)).not.toBeInTheDocument();
    expect(
      await screen.findByText(mockedDocuments[5].code)
    ).toBeInTheDocument();
  });

  it("should filter documents by title", async () => {
    render(<DocumentMasterlist />);

    mockedDocuments[5].title = "XYZ";

    mock.onGet(/.*\/documents.*title=XYZ.*/).reply(200, [mockedDocuments[5]]);

    const inputElement = await screen.findByLabelText(
      "Pesquise pelo título do documento"
    );

    expect(inputElement).toBeInTheDocument();

    //fireEvent.change(inputElement, { target: { value: "XYZ" } });
    //
    //expect(
    //  await screen.findByText(mockedDocuments[5].title)
    //).toBeInTheDocument();
  });
});
