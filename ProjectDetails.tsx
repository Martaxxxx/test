import React, { useState } from "react";
import PartsTable, { Part } from "../components/PartsTable";

// Dane projektu
const initialProject = {
    name: "Mercedes-Benz 300SL Gullwing",
    carId: "MB-300SL-001", // Numer zlecenia
    image: "/path/to/your/gullwing.jpg", // Ścieżka do obrazu Gullwinga
    description: "Ikoniczny Mercedes-Benz 300SL Gullwing, znany z charakterystycznych drzwi otwierających się do góry.", // Opis projektu
    files: [], // Pliki projektu
};

// Dane części
const initialParts: Part[] = [
    {
        id: "1",
        partCode: "ABC123",
        name: "Część A",
        notes: "Notatki do części A",
        status: "W przygotowaniu",
        image: "", // Ścieżka do załadowanego obrazka
    },
    {
        id: "2",
        partCode: "DEF456",
        name: "Część B",
        notes: "Notatki do części B",
        status: "Gotowy do montażu",
        image: "", // Ścieżka do załadowanego obrazka
    },
];

const ProjectDetails = () => {
    const [project, setProject] = useState(initialProject); // Stan projektu
    const [parts, setParts] = useState(initialParts); // Stan części
    const [editMode, setEditMode] = useState(true); // Tryb edycji

    // Funkcja do aktualizacji pól projektu
    const updateProjectField = (field: keyof typeof initialProject, value: string) => {
        setProject((prev) => ({ ...prev, [field]: value }));
    };

    // Funkcja do przesyłania obrazka projektu
    const uploadProjectImage = (file: File) => {
        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            setProject((prev) => ({ ...prev, image: imageUrl }));
        };
        reader.readAsDataURL(file);
    };

    // Funkcja do aktualizacji pól części
    const updateField = (partId: string, field: keyof Part, value: string) => {
        setParts((prev) =>
            prev.map((part) =>
                part.id === partId ? { ...part, [field]: value } : part
            )
        );
    };

    // Funkcja do aktualizacji statusu części - NIE w trybie edycji
    const updateStatus = (partId: string, newStatus: Part["status"]) => {
        setParts((prev) =>
            prev.map((part) =>
                part.id === partId ? { ...part, status: newStatus } : part
            )
        );
    };

    // Funkcja do dodawania nowej części
    const addPart = (newPart: Part) => {
        setParts((prev) => [...prev, newPart]);
    };

    return (
        <div>
            <h1>Szczegóły projektu</h1>

            {/* Obrazek projektu */}
            <div className="mb-4">
                <h4>Obrazek projektu:</h4>
                {project.image && (
                    <img
                        src={project.image}
                        alt="Obrazek projektu"
                        style={{ maxWidth: "300px", marginBottom: "10px" }}
                    />
                )}
                <input
                    type="file"
                    className="form-control"
                    onChange={(e) =>
                        e.target.files && uploadProjectImage(e.target.files[0])
                    }
                />
            </div>

            {/* Opis projektu */}
            <div className="mb-4">
                <h4>Opis projektu:</h4>
                {editMode ? (
                    <textarea
                        className="form-control"
                        value={project.description}
                        rows={4}
                        onChange={(e) =>
                            updateProjectField("description", e.target.value)
                        }
                    />
                ) : (
                    <p>{project.description}</p>
                )}
            </div>

            {/* Edytowalne pola projektu */}
            {editMode && (
                <div className="mb-4">
                    <h4>Edytuj szczegóły projektu:</h4>
                    <div className="mb-3">
                        <label>Nazwa projektu:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={project.name}
                            onChange={(e) =>
                                updateProjectField("name", e.target.value)
                            }
                        />
                    </div>
                    <div className="mb-3">
                        <label>Numer zlecenia:</label>
                        <input
                            type="text"
                            className="form-control"
                            value={project.carId}
                            onChange={(e) =>
                                updateProjectField("carId", e.target.value)
                            }
                        />
                    </div>
                </div>
            )}

            {/* Tabela części */}
            <PartsTable
                parts={parts}
                project={project}
                editMode={editMode}
                updateField={updateField}
                updateStatus={updateStatus}
                addPart={addPart}
                uploadImage={(partId, file) => {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        const imageUrl = e.target?.result as string;
                        setParts((prev) =>
                            prev.map((part) =>
                                part.id === partId ? { ...part, image: imageUrl } : part
                            )
                        );
                    };
                    reader.readAsDataURL(file);
                }}
            />

            {/* Przycisk trybu edycji */}
            <button
                className="btn btn-primary mt-3"
                onClick={() => setEditMode((prev) => !prev)}
            >
                {editMode ? "Wyłącz tryb edycji" : "Włącz tryb edycji"}
            </button>
        </div>
    );
};

export default ProjectDetails;