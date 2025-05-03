import React, { useState, useEffect } from "react";

declare global {
    interface Window {
        QRCode: any;
    }
}

interface Part {
    id: string;
    partCode: string;
    name: string;
    category: string;
    notes: string;
    status: string;
}

interface Props {
    parts: Part[];
    updateStatus: (partId: string, newStatus: string) => void;
    updateField: (partId: string, field: string, value: string) => void;
    editMode: boolean;
}

const PartsTable: React.FC<Props> = ({ parts, updateStatus, updateField, editMode }) => {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://cdn.jsdelivr.net/npm/qrcodejs@1.0.0/qrcode.min.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    const generateQRCode = (id: string, value: string) => {
        const element = document.getElementById(`qrcode-${id}`);
        if (element && element.innerHTML === "" && window.QRCode) {
            new window.QRCode(element, {
                text: value,
                width: 50,
                height: 50,
            });
        }
    };

    useEffect(() => {
        parts.forEach((part) => generateQRCode(part.id, part.partCode));
    }, [parts]);

    return (
        <table className="table-striped table-hover table">
            <thead>
                <tr>
                    <th>QR Kod</th>
                    <th>Kod części</th>
                    <th>Nazwa</th>
                    <th>Kategoria</th>
                    <th>Notatki</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {parts.map((part) => (
                    <tr key={part.id}>
                        <td>
                            <div id={`qrcode-${part.id}`} />
                        </td>
                        <td>{part.partCode}</td>
                        <td>{part.name}</td>
                        <td>{part.category}</td>
                        <td>{part.notes}</td>
                        <td>{part.status}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

export default PartsTable;