import React, { useCallback, useEffect, useState } from "react";
import { Label, Modal, Select } from "flowbite-react";
import {
  MdAdd,
  MdClose,
  MdNewReleases,
  MdOutlineCategory,
  MdOutlineInventory,
  MdOutlineUploadFile,
  MdTitle,
} from "react-icons/md";
import { useDropzone } from "react-dropzone";
import CameraComponent from "../../utils/CameraComponent";
import { BiDevices } from "react-icons/bi";
import { AiOutlineFieldNumber, AiOutlineNumber } from "react-icons/ai";
import { Tb3DCubeSphere, TbListDetails } from "react-icons/tb";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AutocompleteInput from "../../components/inputs/AutocompleteInput";
import TextInput from "../../components/inputs/TextInput";
import { Base_InventoryField } from "../../context/Models";
import toast from "react-hot-toast";
import FileList from "../../components/Files/FileList";
import { handleIconFile } from "../../utils/HandleIconFile";

const InventoryFields = ({
  body = {
    inventoryModelId: "",
    otherModel: "",
    inventoryBrandId: "",
    otherBrand: "",
    inventoryTypeId: "",
    otherType: "",
    serialNumber: "",
    activo: "",
    comments: "",
    status: 1,
    images: [],
    files: [],
    altaDate: Date.now(),
    bajaDate: null,
    recepcionDate: null,
    createdBy: "",
  },
  setBody,
  images = [],
  setImages,
  inventoryTypes = [],
  inventoryBrands = [],
  inventoryModels = [],
  inventoryFields = [],
  selectedDetails = [],
  setSelectedDetails,
  titleForm,
  handleSelectInput,
  errors,
  setErrors,
}) => {
  useEffect(() => {
    if (body.inventoryTypeId != "0") setBody({ ...body, otherType: "" });
    if (body.inventoryBrandId != "0") setBody({ ...body, otherBrand: "" });
    if (body.inventoryModelId != "0") setBody({ ...body, otherModel: "" });
  }, [body.inventoryTypeId, body.inventoryBrandId, body.inventoryModelId]);

  const [showData, setShowData] = useState("general");
  const [showModal, setShowModal] = useState(false);
  const [currentFile, setCurrentFile] = useState(null);
  const [currentFileData, setCurrentFileData] = useState({
    title: "",
    description: "",
  });

  console.log(currentFile);

  const handleOtherField = (e) => {
    if (e) {
      if (e?.value == "0") {
        setSelectedDetails([
          ...selectedDetails,
          { id: e.value, key: "", value: "" },
        ]);
      } else {
        const keyExists = selectedDetails.some(
          (detail) => detail.key === e.label
        );
        if (!keyExists) {
          setSelectedDetails([
            ...selectedDetails,
            { id: e.value, key: e.label, value: "" },
          ]);
        }
      }

      document.getElementById("inventoryField").value = "";
    }
  };

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];

      if (selectedFile) {
        // Verificar si el archivo ya existe en el estado
        const isFileAlreadyAdded = body.files.some(
          (file) => file.file.name === selectedFile.name
        );

        if (isFileAlreadyAdded) {
          toast.error("El archivo ya ha sido agregado");
          return;
        }

        const acceptedTypes = [
          "application/pdf",
          "text/csv",
          "text/plain",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
        ];

        if (acceptedTypes.includes(selectedFile.type)) {
          setCurrentFile(selectedFile);
          setCurrentFileData({
            title: selectedFile.name?.split(".")[0] ?? "",
            description: "",
          });
        } else {
          toast.error("El tipo de archivo no es aceptado");
        }
      }
    },
    [setCurrentFile, setCurrentFileData, body.files]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
    accept:
      ".pdf, .txt, .doc, .docx, .csv, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document, application/vnd.ms-excel, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const onSuccess = () => {
    let file = {
      title: currentFileData.title,
      description: currentFileData.description,
      file: currentFile,
    };

    setBody((prevBody) => {
      // Encuentra el índice del archivo existente
      const existingFileIndex = prevBody.files.findIndex(
        (existingFile) => existingFile.file === currentFile
      );

      // Si el archivo existe, reemplázalo; de lo contrario, agrégalo
      if (existingFileIndex !== -1) {
        const updatedFiles = [...prevBody.files];
        updatedFiles[existingFileIndex] = file;

        return {
          ...prevBody,
          files: updatedFiles,
        };
      } else {
        return {
          ...prevBody,
          files: [...prevBody.files, file],
        };
      }
    });

    setCurrentFile(null);
    setCurrentFileData({ title: "", description: "" });
    setShowModal(false);
  };

  let generalData = (
    <div className="grid grid-cols-12 w-full h-full gap-3 justify-center items-start">
      <div className="col-span-12">
        <p className=" text-gray-500">
          Llena los campos para agregar un nuevo inventario. Los campos marcados
          con <span className="text-red-500">*</span> son obligatorios.
        </p>
      </div>
      <div className="col-span-12 sm:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label htmlFor="inventoryModelId" value="Modelo" />
        </div>
        <div className="relative">
          <AutocompleteInput
            data={inventoryModels}
            value={body.inventoryModelId}
            onChange={(e) => handleSelectInput(e, "inventoryModelId")}
            icon={Tb3DCubeSphere}
            isClearable
            isOtherOption
            required
            error={errors.inventoryModelId}
            setErrors={setErrors}
          />
        </div>
      </div>
      <div className="col-span-12 sm:col-span-6">
        {body.inventoryModelId == "0" && (
          <div>
            <div className="w-full flex gap-1">
              <span className="text-red-500">*</span>
              <Label htmlFor="otherModel" value="Especifique el Modelo" />
            </div>
            <TextInput
              id="otherModel"
              type="text"
              icon={Tb3DCubeSphere}
              color={"bg-white"}
              style={{
                borderColor: "#ccc",
                borderWidth: "1px",
                borderStyle: "solid",
                paddingTop: "13px",
                paddingBottom: "13px",
              }}
              placeholder="Especicar modelo"
              required={true}
              value={body.otherModel}
              onChange={(e) => setBody({ ...body, otherModel: e.target.value })}
            />
          </div>
        )}
      </div>
      <div className="col-span-12 sm:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label
            htmlFor="inventoryBrandId"
            value="Selecciona la marca del equipo"
          />
        </div>
        <AutocompleteInput
          data={inventoryBrands}
          value={body.inventoryBrandId}
          onChange={(e) => handleSelectInput(e, "inventoryBrandId")}
          icon={MdNewReleases}
          isOtherOption
          isClearable
          disabled={
            body.otherModel == "" || body.inventoryModelId != "0" ? true : false
          }
          error={errors.inventoryBrandId}
          setErrors={setErrors}
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        {body.inventoryBrandId == "0" && (
          <div>
            <div className="w-full flex gap-1">
              <span className="text-red-500">*</span>
              <Label
                htmlFor="otherBrand"
                value="Especifique la Marca del equipo"
              />
            </div>
            <TextInput
              id="otherBrand"
              type="text"
              icon={MdNewReleases}
              color={"bg-white"}
              style={{
                borderColor: "#ccc",
                borderWidth: "1px",
                borderStyle: "solid",
                paddingTop: "13px",
                paddingBottom: "13px",
              }}
              placeholder="Especifique la marca"
              required={true}
              value={body.otherBrand}
              onChange={(e) => setBody({ ...body, otherBrand: e.target.value })}
            />
          </div>
        )}
      </div>
      <div className="col-span-12 sm:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label
            htmlFor="inventoryTypeId"
            value="Selecciona el tipo de equipo"
          />
        </div>
        <AutocompleteInput
          data={inventoryTypes}
          value={body.inventoryTypeId}
          onChange={(e) => handleSelectInput(e, "inventoryTypeId")}
          icon={BiDevices}
          isOtherOption
          isClearable
          disabled={
            body.otherModel == "" || body.inventoryModelId != "0" ? true : false
          }
          error={errors.inventoryTypeId}
          setErrors={setErrors}
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        {body.inventoryTypeId == "0" && (
          <div>
            <div className="w-full flex gap-1">
              <span className="text-red-500">*</span>
              <Label
                htmlFor="otherType"
                value="Especifique el tipo de inventario"
              />
            </div>
            <TextInput
              id="otherType"
              type="text"
              icon={BiDevices}
              color={"bg-white"}
              style={{
                borderColor: "#ccc",
                borderWidth: "1px",
                borderStyle: "solid",
                paddingTop: "13px",
                paddingBottom: "13px",
              }}
              placeholder="Especifique el tipo de equipo"
              required={true}
              value={body.otherType}
              onChange={(e) => setBody({ ...body, otherType: e.target.value })}
            />
          </div>
        )}
      </div>
      <div className="col-span-12 sm:col-span-6">
        <div className="mb-1 w-full flex gap-1">
          <span className="pr-2"></span>
          <Label htmlFor="serialNumber" value="Número de Serie" />
        </div>
        <TextInput
          id={"serialNumber"}
          type="text"
          icon={AiOutlineFieldNumber}
          placeholder="Número de serie"
          required={false}
          isClearable
          value={body.serialNumber}
          onChange={(e) => setBody({ ...body, serialNumber: e.target.value })}
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        <div className="mb-1 w-full flex gap-1">
          <span className="text-red-500 pr-2"></span>
          <Label htmlFor="activo" value="Número de activo" />
        </div>
        <TextInput
          id="activo"
          type="text"
          icon={AiOutlineNumber}
          placeholder="Activo"
          required={false}
          isClearable
          value={body.activo}
          onChange={(e) => setBody({ ...body, activo: e.target.value })}
        />
      </div>
      <div className="col-span-12 sm:col-span-6">
        <div className="w-full flex gap-1">
          <span className="text-red-500">*</span>
          <Label htmlFor="status" value="¿Status del equipo?" />
        </div>
        <Select
          value={body.status}
          onChange={(e) => setBody({ ...body, status: e.target.value })}
          id="status"
          icon={MdOutlineCategory}
          color={"bg-white"}
          style={{
            borderColor: "#ccc",
            borderWidth: "1px",
            borderStyle: "solid",
            paddingTop: "13px",
            paddingBottom: "13px",
          }}
          required={true}
        >
          <option value="">-- Selecciona una opción --</option>
          <option value={1}>Alta</option>
          <option value={2}>Propuesta de baja</option>
          <option value={3}>Baja</option>
        </Select>
      </div>
      <div className="col-span-12 sm:col-span-6">
        <div className="mb-1 w-full flex gap-1">
          <span className="text-red-500"></span>
          <Label htmlFor="recepcionDate" value="Fecha de recepción" />
        </div>
        <TextInput
          type="date"
          id="recepcionDate"
          name="recepcionDate"
          value={body.recepcionDate || ""}
          onChange={(e) => setBody({ ...body, recepcionDate: e.target.value })}
        />
      </div>
      <div className="col-span-12">
        <div className="w-full">
          <Label
            className="font-semibold"
            htmlFor="comments"
            value="Comentarios"
          />
        </div>
        <ReactQuill
          id="comments"
          placeholder="Comentarios..."
          modules={{
            toolbar: [
              [{ header: [1, 2, false] }],
              ["bold", "italic", "underline", "strike", "blockquote"],
              [
                { list: "ordered" },
                { list: "bullet" },
                { indent: "-1" },
                { indent: "+1" },
              ],
              ["link", "image"],
              ["clean"],
            ],
          }}
          theme="snow"
          value={body.comments}
          onChange={(e) => setBody({ ...body, comments: e })}
        />
      </div>
      <div className="col-span-12 h-fit">
        <div className="pb-2">
          <Label value="Agregar imagenes" />
        </div>
        <CameraComponent capturedImage={images} setCapturedImage={setImages} />
      </div>
      <div className="col-span-12">
        <hr className="my-4" />
      </div>
      <div className="col-span-12">
        <div className="pb-2">
          <Label value="Agregar archivos" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 2xl:grid-cols-5 gap-4 py-4">
          <div
            onClick={() => setShowModal(true)}
            className="flex cursor-pointer w-full gap-2 items-center justify-center rounded-md bg-green-400 hover:bg-green-500 text-white transition-all ease-in-out duration-200 shadow-md p-4"
          >
            <span className="text-4xl">
              <MdOutlineUploadFile />
            </span>
            <p className="text-center text-sm font-semibold whitespace-nowrap">
              Agregar archivos
            </p>
          </div>
          <FileList
            files={body.files}
            onDelete={(file) => {
              setBody({
                ...body,
                files: body.files.filter((x) => x.file.name !== file.file.name),
              });
            }}
            onDownload={(file) => {
              const url = window.URL.createObjectURL(file.file);
              const link = document.createElement("a");
              link.href = url;
              link.setAttribute("download", file.file.name);
              document.body.appendChild(link);
              link.click();
            }}
            onEdit={(file) => {
              setCurrentFile(file.file);
              setCurrentFileData({
                title: file.title,
                description: file.description,
              });
              setShowModal(true);
            }}
            isShow
          />
        </div>
      </div>
      <Modal
        dismissible
        show={showModal}
        onClose={() => setShowModal(false)}
        title="Agregar archivo"
        size="lg"
      >
        <Modal.Header>Agregar archivos</Modal.Header>
        <Modal.Body className="flex flex-col gap-4">
          <div className="w-full h-full">
            <div
              {...getRootProps()}
              className="min-h-[15vh] text-center flex flex-col justify-center items-center gap-2 border-2 border-dashed border-gray-300 rounded-md hover:border-gray-400 transition-all ease-in-out duration-200"
            >
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Suelta los archivos aquí...</p>
              ) : (
                <p>
                  Arrastra y suelta archivos aquí o haz clic para seleccionar
                  archivos
                </p>
              )}
            </div>
            {currentFile ? (
              <div className="py-4">
                <h2>Archivo Seleccionado:</h2>
                <div className="relative flex flex-col w-full min-h-[20vh] gap-2 items-center justify-center rounded-md hover:bg-gray-50 transition-all ease-in-out duration-200 shadow-md p-4">
                  <span>{handleIconFile(currentFile?.type)}</span>
                  <span>
                    {currentFile.name?.substring(0, 25)?.trim()}
                    {currentFile?.name?.length > 25 && "..."}
                  </span>
                  <button
                    className="py-1 px-2 rounded-full hover:bg-red-500 hover:text-white absolute top-2 right-2"
                    onClick={() => setCurrentFile(null)}
                  >
                    &#x2715;
                  </button>
                </div>
              </div>
            ) : (
              <div className="py-4">
                <h2>Aun no hay archivos seleccionados</h2>
              </div>
            )}
            <Label htmlFor="title" value="Titulo" />
            <TextInput
              key={currentFile?.name}
              value={currentFileData.title}
              id={"title"}
              required={true}
              placeholder="Titulo"
              icon={MdTitle}
              onChange={(e) =>
                setCurrentFileData({
                  ...currentFileData,
                  title: e.target.value,
                })
              }
            />
            <Label htmlFor="fileComments" value="Descripción" />
            <ReactQuill
              id="fileComments"
              placeholder="Comentarios..."
              modules={{
                toolbar: [
                  [{ header: [1, 2, false] }],
                  ["bold", "italic", "underline", "strike", "blockquote"],
                  [
                    { list: "ordered" },
                    { list: "bullet" },
                    { indent: "-1" },
                    { indent: "+1" },
                  ],
                  ["link", "image"],
                  ["clean"],
                ],
              }}
              theme="snow"
              value={currentFileData.description}
              onChange={(e) =>
                setCurrentFileData({ ...currentFileData, description: e })
              }
            />
          </div>
        </Modal.Body>
        <Modal.Footer className="flex justify-evenly">
          <button
            type="button"
            className="inline-flex justify-center items-center gap-2 text-red-500 border bordere-red-500 px-2 py-1 rounded-md text-sm md:text-base hover:border-red-500 hover:bg-red-500 hover:text-white transition ease-in-out duration-100"
            onClick={() => {
              setShowModal(false);
              setCurrentFile(null);
              setCurrentFileData({ title: "", description: "" });
            }}
            style={{ transition: "background-color 0.5s ease" }}
          >
            <span>
              <MdClose className="w-5 h-5 " />
            </span>
            <span className="hidden md:block">Cancelar</span>
          </button>

          <button
            type="button"
            className="inline-flex justify-center items-center gap-2 text-blue-500 border bordere-blue-500 px-2 py-1 rounded-md text-sm md:text-base hover:border-blue-500 hover:bg-blue-500 hover:text-white transition ease-in-out duration-100"
            onClick={() => onSuccess()}
            style={{ transition: "background-color 0.5s ease" }}
          >
            <span>
              <MdAdd className="w-5 h-5 " />
            </span>
            <span className="hidden md:block">Agregar</span>
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
  console.log(body);
  let detailsData = (
    <div className="w-full h-full">
      <p className=" text-gray-500 pb-4">
        Selecciona los campos que deseas agregar al inventario.
      </p>
      <AutocompleteInput
        id={"inventoryField"}
        name={"inventoryField"}
        placeholder="Selecciona un campo"
        data={inventoryFields?.map((item) => ({
          value: item.id,
          label: item?.name ?? item?.key,
        }))}
        value={""}
        onChange={(e) => handleOtherField(e ?? null)}
        icon={TbListDetails}
        isClearable
        isOtherOption={selectedDetails.some((x) => x.id == "0") ? false : true}
      />
      <div className="w-full flex flex-col gap-2 py-4">
        <table className="w-full">
          <thead className="bg-neutral-300 text-sm md:text-base text-neutral-700">
            <tr className="border-b border-gray-200">
              <th className="text-left p-3">Campo</th>
              <th className="text-center p-3">Valor</th>
              <th className="text-center p-3">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {selectedDetails.map((item, index) => (
              <tr key={index} className="border-t border-gray-200">
                <td className="text-left text-xs md:text-base">
                  {item.id == "0" ? (
                    <TextInput
                      id={item.key}
                      type="text"
                      value={item.key}
                      onChange={(e) => {
                        let newSelectedDetails = [...selectedDetails];
                        newSelectedDetails[index].key = e.target.value;
                        setSelectedDetails(newSelectedDetails);
                      }}
                      isClearable
                    />
                  ) : (
                    <span className="uppercase font-medium p-3">
                      {item.key}
                    </span>
                  )}
                </td>
                <td className="text-center p-2">
                  <TextInput
                    id={item.key}
                    type="text"
                    placeholder={item.key}
                    value={
                      item?.key == "Mac"
                        ? getMACFormat(item.value.toUpperCase())
                        : item.value
                    }
                    onChange={(e) => {
                      let newSelectedDetails = [...selectedDetails];
                      newSelectedDetails[index].value = e.target.value;
                      setSelectedDetails(newSelectedDetails);
                    }}
                    isClearable
                  />
                </td>
                <td className="text-center p-2 whitespace-nowrap">
                  {item.id == "0" && (
                    <button
                      type="button"
                      className="inline-flex justify-center items-center gap-2 text-blue-500 border bordere-blue-500 px-2 py-1 rounded-md text-sm md:text-base hover:border-blue-500 hover:bg-blue-500 hover:text-white transition ease-in-out duration-100"
                      onClick={() => {
                        let newInventoryFields = [...inventoryFields];
                        newInventoryFields.push({
                          id: selectedDetails.length + 1,
                          key: item.key,
                        });
                        setSelectedDetails([
                          ...selectedDetails.filter((x) => x.id != "0"),
                          {
                            id: selectedDetails.length,
                            key: item.key,
                            value: item.value,
                          },
                        ]);
                      }}
                      style={{ transition: "background-color 0.5s ease" }}
                    >
                      <span>
                        <MdAdd className="w-5 h-5 " />
                      </span>
                      <span className="hidden md:block">Agregar</span>
                    </button>
                  )}
                  {!Base_InventoryField.some(
                    (element) => element.key === item.key
                  ) && (
                    <button
                      type="button"
                      className="ml-2 inline-flex justify-center items-center gap-2 text-red-500 border bordere-red-500 px-2 py-1 rounded-md text-sm md:text-base hover:border-red-500 hover:bg-red-500 hover:text-white transition ease-in-out duration-100"
                      onClick={() => {
                        setSelectedDetails(
                          selectedDetails.filter((x) => x.id !== item.id)
                        );
                      }}
                      style={{ transition: "background-color 0.5s ease" }}
                    >
                      <span>
                        <MdClose className="w-5 h-5 " />
                      </span>
                      <span className="hidden md:block">Eliminar</span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  return (
    <div className="w-full h-full bg-white rounded-lg">
      <div className="grid grid-cols-2 w-full">
        <button
          type="button"
          className={`text-sm md:text-base font-bold ${
            showData == "general"
              ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
              : "text-neutral-500 border-b-2 border-neutral-300"
          } w-full flex justify-center items-center px-4 py-3`}
          onClick={() => setShowData("general")}
        >
          <span className="pr-2">
            <MdOutlineInventory className="w-5 h-5" />
          </span>
          {titleForm}
        </button>
        <button
          type="button"
          className={`text-sm md:text-base font-bold ${
            showData == "details"
              ? "border-b-2 border-blue-600 text-blue-600 font-semibold"
              : "text-neutral-500 border-b-2 border-neutral-300"
          } w-full flex justify-center items-center px-4 py-3`}
          onClick={() => setShowData("details")}
        >
          <span className="pr-2">
            <TbListDetails className="w-5 h-5" />
          </span>
          Detalles
        </button>
      </div>
      <div className="w-full h-full p-3 md:p-5">
        <div className={`${showData == "general" ? "block" : "hidden"}`}>
          {generalData}
        </div>
        <div className={`${showData == "details" ? "block" : "hidden"}`}>
          {detailsData}
        </div>
      </div>
    </div>
  );
};

export default InventoryFields;

const getMACFormat = (mac) => {
  if (mac) {
    let macFormat = "";
    for (let i = 0; i < mac.length; i++) {
      if (i % 4 == 0 && i != 0) {
        macFormat += ":" + mac[i];
      } else {
        macFormat += mac[i];
      }
    }
    return macFormat;
  }
};

const dropzoneStyle = {
  border: "2px dashed #ccc",
  borderRadius: "4px",
  padding: "20px",
  textAlign: "center",
  cursor: "pointer",
};
