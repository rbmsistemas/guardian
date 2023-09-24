import React, { useContext, useEffect, useRef, useState } from "react";
import { FaEye, FaHome, FaSave } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoArrowBack } from "react-icons/io5";
import { FiChevronRight } from "react-icons/fi";
import Loading from "../../utils/Loading";
import { toast } from "react-hot-toast";
import Context from "../../context/Context";
import { uploadImageCompany } from "../../api/request.api";
import CreateCompany from "./CreateCompany";
import { Base_Company } from "../../context/Models";

const CompanyForm = () => {
  const navigate = useNavigate();
  const submitRef = useRef(null);
  const { id } = useParams();
  const { createCompany, user, updateCompany, company, getCompany } =
    useContext(Context);
  const [companyData, setCompanyData] = useState(Base_Company);
  const [volver, setVolver] = useState(false);
  const [loading, setLoading] = useState(false);
  const notificationError = (message) => toast.error(message);
  const successNotification = (message) => toast.success(message);

  useEffect(() => {
    if (id) {
      getCompany(id);
      setVolver(true);
    } else {
      setCompanyData(Base_Company);
      setVolver(false);
    }
  }, [id]);

  useEffect(() => {
    if (id && company?.id) {
      setCompanyData({
        name: company.name || "",
        manager: company.manager || "",
        email: company.email || "",
        phone: company.phone || "",
        logo: company.logo || "",
        status: company.status || true,
        comments: company.comments || "",
      });
    }
  }, [company]);

  const compareChanges = (data, company) => {
    let changes = false;
    if (!id || !company || !data) {
      return false;
    }
    Object.keys(data).forEach((key) => {
      if (company[key] !== data[key]) {
        changes = true;
      }
    });
    return changes;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (id) {
      try {
        let newImage = null;
        if (companyData.logo !== company.logo) {
          newImage = await handleUploadFile();
        }
        const newCompany = {
          ...companyData,
          logo: newImage ?? company.logo,
        };

        const res = await updateCompany(id, newCompany, user.token);
        if (res?.status > 299) {
          notificationError("Error al actualizar al companyData");
          return console.log(res);
        }
        successNotification("Compañia actualizado correctamente");
        setTimeout(() => {
          navigate(`/companies/editar/${id}`);
        }, 2000);
        setLoading(false);
      } catch (error) {
        console.log(error);
        notificationError("Error al actualizar la imagen");
      }
    } else {
      let newImage = null;
      if (companyData.logo !== company.logo) {
        newImage = await handleUploadFile();
      }
      const newCompany = {
        ...companyData,
        logo: newImage ?? company.logo,
      };

      const res = await createCompany(newCompany);

      if (res?.status > 299) {
        notificationError("Error al crear al companyData");
        return console.log(res.data.message);
      }
      successNotification("Compañia creado correctamente");

      console.log(res);
      setTimeout(() => {
        navigate(`/companies/editar/${res.id}`);
      }, 2000);
      setLoading(false);
    }
  };

  const handleUploadFile = async () => {
    try {
      const formData = new FormData();
      formData.append("image", companyData.logo);

      const imageRes = await uploadImageCompany(formData, user.token);
      if (imageRes?.status > 299) {
        setLoading(false);
        notificationError("Error al actualizar la imagen");
        console.log(imageRes);
      }
      return imageRes.data;
    } catch (error) {
      console.log(error);
      notificationError("Error al actualizar la imagen");
    }
  };

  const onChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setCompanyData({ ...companyData, [name]: files[0] });
    } else {
      setCompanyData({ ...companyData, [name]: value });
    }
  };

  const handleSubmitButton = () => {
    submitRef.current.click();
  };

  return (
    <div className="min-h-full w-full p-5">
      <div className="flex flex-col gap-4 md:flex-row md:justify-between items-center">
        <div className="flex gap-2 items-center">
          <Link to="/" className="text-gray-500 hover:text-gray-700">
            <FaHome className="text-xl" />
          </Link>
          <span className="text-gray-500 text-xl">
            <FiChevronRight />
          </span>
          <Link to="/companies" className="text-gray-500 hover:text-gray-700">
            Compañias
          </Link>
          <span className="text-gray-500 text-xl">
            <FiChevronRight />
          </span>
          <Link to="#" className="text-gray-500 hover:text-gray-700">
            Nuevo compañia
          </Link>
        </div>
        <div className="flex gap-2 items-center">
          <Link
            to="/companies"
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-5 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <IoArrowBack className="text-white text-lg" />
            </span>
            {volver && compareChanges(companyData, company)
              ? "Cancelar"
              : "Volver"}
          </Link>
          <button
            type="submit"
            onClick={handleSubmitButton}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
          >
            <span>
              <FaSave className="text-white text-lg" />
            </span>

            {id ? "Actualizar" : "Guardar"}
          </button>
          {id && (
            <Link
              to={`/companies/ver/${id}`}
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
            >
              <span>
                <FaEye className="text-white text-lg" />
              </span>
              Ver
            </Link>
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <h2 className="text-xl font-bold"></h2>
        <form
          onSubmit={onSubmit}
          className="flex flex-col gap-5 mt-5 bg-white p-5 rounded-lg"
        >
          <CreateCompany company={companyData} onChange={onChange} />
          <div className="flex justify-end">
            <button
              ref={submitRef}
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
            >
              <span>
                <FaSave className="text-white text-lg" />
              </span>

              {id ? "Actualizar" : "Guardar"}
            </button>
          </div>
        </form>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default CompanyForm;
