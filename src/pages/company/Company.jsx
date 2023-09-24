import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaCheck, FaHome, FaSearch, FaStore, FaTimes } from "react-icons/fa";
import { FiChevronRight } from "react-icons/fi";
import {
  AiFillFileAdd,
  AiOutlineClear,
  AiOutlinePoweroff,
} from "react-icons/ai";
import CustomeTable from "../../components/table/CustomeTable";
import { Label, Modal, Select, TextInput } from "flowbite-react";
import Context from "../../context/Context";
import { toast } from "react-hot-toast";
import { ClipLoader } from "react-spinners";

const Company = () => {
  const { companies, getCompanyBySearch, deleteCompany } = useContext(Context);
  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    search: "",
    status: "",
    page: 1,
    quantityResults: 10,
  });
  const [totals, setTotals] = useState({ totalEntries: 0, totalPages: 0 });
  const [modal, setModal] = useState(false);
  const [companiesData, setCompaniesData] = useState([]);
  const [companyToDelete, setCompanyToDelete] = useState({});
  const [loading, setLoading] = useState(false);

  const errorNotify = (message) => toast.error(message);
  const successNotify = (message) => toast.success(message);

  useEffect(() => {
    setLoading(true);

    const res = async () => {
      const data = await getCompanyBySearch(filters);

      if (data) {
        setTotals({
          totalEntries: data.totalEntries,
          totalPages: data.totalPages,
        });
      }
    };
    res();
    setLoading(false);
  }, [filters]);

  useEffect(() => {
    let formatedCompany = [];
    if (companies) {
      formatedCompany = companies?.map((company, index) => {
        return {
          no: index + 1,
          imagen: company.logo,
          compañia: company.name,
          encargado: company.manager,
          "correo electronico": company.email,
          teléfono: company.phone,
          estado: company.status ? "Activo" : "Inactivo",
          id: company.id,
        };
      });
    }
    setCompaniesData(formatedCompany);
    setLoading(false);
  }, [companies]);

  const handleDelete = async (id) => {
    setModal(true);
    setCompanyToDelete(companies.find((company) => company.id === id));
  };

  const onDelete = async () => {
    const data = await deleteCompany(companyToDelete.id);
    if (!data) {
      errorNotify("Error al eliminar la compañia");
      setModal(false);
      return;
    }
    if (data) {
      const res = await getCompanyBySearch(filters);
      if (res) {
        setTotals({
          totalEntries: res.totalEntries,
          totalPages: res.totalPages,
        });
        successNotify("Compañia eliminado correctamente");
      }
      setModal(false);
    }
  };

  return (
    <div className="min-h-full w-full p-5">
      <div className="flex flex-col md:flex-row justify-between items-center pb-2">
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
        </div>
        <Link
          to="/companies/crear"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
        >
          <span>
            <AiFillFileAdd className="text-white text-lg" />
          </span>
          Nueva compañia
        </Link>
      </div>
      <div className="flex flex-col gap-2">
        <div className="grid grid-cols-4 gap-2 md:gap-5 pb-2">
          <div className="col-span-4 md:col-span-2 flex flex-col gap-2">
            <div className="w-full">
              <Label htmlFor="search" value="Buscar" />
            </div>
            <TextInput
              id="search"
              type="text"
              icon={FaSearch}
              placeholder="Compañia, encargado, teléfono, correo electrónico..."
              required={true}
              value={filters.search}
              onChange={(e) =>
                setFilters({ ...filters, search: e.target.value })
              }
            />
          </div>
          <div className="col-span-4 md:col-span-1 flex flex-col gap-2">
            <div className="w-full">
              <Label htmlFor="status" value="Estado" />
            </div>
            <Select
              icon={AiOutlinePoweroff}
              id="status"
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="">Todos</option>
              <option value={1}>Activo</option>
              <option value={0}>Inactivo</option>
            </Select>
          </div>

          <div className="col-span-4 md:col-span-1 flex flex-col gap-2 pt-2 md:pt-0">
            <div className="w-full hidden md:block">
              <Label htmlFor="clean" value="&nbsp;" />
            </div>
            <button
              onClick={() =>
                setFilters({
                  search: "",
                  status: "",
                  page: 1,
                  quantityResults: 10,
                })
              }
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded flex gap-2 items-center justify-center transition ease-in-out duration-200 hover:scale-105"
            >
              <span>
                <AiOutlineClear className="text-white text-lg" />
              </span>
              Limpiar filtros
            </button>
          </div>
        </div>
        {loading ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <ClipLoader color="#7E3AF2" size={100} loading={loading} />
          </div>
        ) : !loading && totals.totalEntries == 0 ? (
          <div className="flex flex-col items-center justify-center gap-2">
            <h1 className="text-2xl font-semibold">No hay resultados</h1>
            <p className="text-gray-500">
              No se encontraron resultados para la búsqueda{" "}
              <span className="font-semibold">{filters.search}</span>
              <span className="font-semibold">
                {
                  {
                    1: " en estado activo",
                    0: " en estado inactivo",
                  }[filters.status]
                }
              </span>
            </p>
          </div>
        ) : (
          <CustomeTable
            showId={false}
            showImagen={true}
            data={companiesData}
            onShow={(id) => navigate(`/companies/ver/${id}`)}
            onEdit={(id) => navigate(`/companies/editar/${id}`)}
            onDelete={(id) => handleDelete(id)}
            quantityResults={filters.quantityResults}
            setQuantityResults={(quantityResults) =>
              setFilters({ ...filters, quantityResults })
            }
            page={filters.page}
            setPage={(page) => setFilters({ ...filters, page })}
            totalEntries={totals.totalEntries}
            totalPages={totals.totalPages}
          />
        )}
      </div>
      {modal && (
        <Modal
          title="Eliminar compañia"
          dismissible={true}
          onClose={() => {
            setModal(false);
          }}
          show={modal}
        >
          <Modal.Header>
            <div className="flex gap-2 items-center">
              <span className="bg-red-500 rounded-full p-2">
                <FaStore className="text-white text-xl" />
              </span>
              <p className="text-xl font-bold text-red-500">
                Eliminar compañia
              </p>
            </div>
          </Modal.Header>
          <Modal.Body>
            <p className="text-gray-500">
              ¿Está seguro que desea eliminar la compañia{" "}
              <span className="font-bold">{companyToDelete.name}</span>?
            </p>
          </Modal.Body>
          <Modal.Footer>
            <div className="flex justify-end gap-2 w-full">
              <button
                onClick={() => {
                  onDelete();
                }}
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
              >
                <span>
                  <FaCheck className="text-white text-lg" />
                </span>
                Aceptar
              </button>
              <button
                onClick={() => {
                  setModal(false);
                }}
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex gap-2 items-center transition ease-in-out duration-200 hover:scale-105"
              >
                <span>
                  <FaTimes className="text-white text-lg" />
                </span>
                Cancelar
              </button>
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </div>
  );
};

export default Company;
