import { useForm } from 'react-hook-form';
import {
    Stethoscope,
    MessageCircle,
    Calendar,
    User,
    Activity,
    Users,
    CreditCard,
} from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthContext';
import Consulta from '../../../models/Consulta';
import Paciente from '../../../models/Paciente';
import { buscar, cadastrar } from '../../../service/Service';
import toast from 'react-hot-toast';
import Medico from '../../../models/Medico';
import { useNavigate } from 'react-router-dom';

const FormConsulta = () => {
    const navigate = useNavigate();
    const { usuario, handleLogout } = useContext(AuthContext);
    const token = usuario.token;

    const [paciente, setPaciente] = useState<Paciente | null>(null);
    const [buscaRealizada, setBuscaRealizada] = useState(false);
    const [cpf, setCpf] = useState('');

    const [medicosEspecialistas, setMedicosEspecialistas] = useState<Medico[]>([]);
    const [especialidade, setEspecialidade] = useState('');

    const { register, handleSubmit, setValue, reset } = useForm<Consulta>();
    const [consulta, setConsulta] = useState<Consulta | null>(null);

    const abrirWhatsAppConsulta = (consultaData: Consulta) => {
        if (!paciente || !paciente.telefone) {
            toast.error("WhatsApp: Paciente ou telefone inválido!");
            return;
        }

        const telefoneFormatado = paciente.telefone.replace(/\D/g, "");

        const formatarData = (data: string) => {
            const partesData = data.split("-");
            const dia = partesData[2];
            const mes = partesData[1];
            const ano = partesData[0];
            return `${dia}/${mes}/${ano}`;
        };

        const mensagem = `
        Olá ${paciente.nome}, sua consulta foi agendada com sucesso! 
    
        Aqui estão os detalhes:
    
        Especialidade: ${consultaData.especialidade}
        Data: ${formatarData(consultaData.dataHora)}
        Médico Responsável: ${consultaData.medico?.nome || 'Não especificado'}
        Queixa: ${consultaData.queixa}
        Status: ${consultaData.status}
        Método Pagamento: ${consultaData.statusPagamento} 
    
        Aguardamos você na data e horário agendado. Qualquer dúvida, estamos à disposição.
        `;

        const whatsappUrl = `https://api.whatsapp.com/send?phone=${telefoneFormatado}&text=${encodeURIComponent(mensagem)}`;
        window.open(whatsappUrl, "_blank");
    };

    const onSubmit = async (data: Consulta) => {
        try {
            await cadastrar(`/consultas`, data, (response: Consulta) => {
                setConsulta(response);

                abrirWhatsAppConsulta(response);
                // Reset form after successful submission
                reset();
                setPaciente(null);
                setCpf('');
                setEspecialidade('');
                setMedicosEspecialistas([]);
            }, {
                headers: { Authorization: token },
            });
            toast.success('Consulta cadastrada com sucesso!');
            navigate("/dashboard/consulta")
        } catch (error: any) {
            if (error.toString().includes('403')) {
                handleLogout();
            }
            toast.error('Erro ao cadastrar consulta.');
        }
    };

    const buscarPacientePorCpf = async () => {
        setBuscaRealizada(false);
        try {
            let pacienteData: Paciente | null = null;

            await buscar(`/pacientes/cpf/${cpf}`, (data: Paciente) => {
                pacienteData = data;
                setPaciente(data);
            }, {
                headers: { Authorization: token },
            });

            if (pacienteData) {
                toast.success('Paciente encontrado!')
                setValue('paciente', pacienteData);
            }
        } catch (error) {
            toast.error('Erro ao buscar paciente:', error);
            setPaciente(null);
            toast.error('Paciente não encontrado');
        }
        setBuscaRealizada(true);
    };

    const buscaCpfEnter = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            buscarPacientePorCpf();
        }
    };

    async function buscarMedicosEspecialistas() {
        if (!especialidade) {
            toast.error("Nenhuma especialidade selecionada")
            return;
        }

        try {
            await buscar(`/medicos/especialidade/${especialidade}`, setMedicosEspecialistas, {
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json",
                },
            });
        } catch (error: any) {
            console.error("Erro ao buscar médicos:", error);
            if (error.toString().includes("404")) {
                toast.error("Nenhum médico encontrado.");
            } else {
                toast.error("Erro ao buscar médicos. Tente novamente.");
            }
        }
    }

    useEffect(() => {
        if (especialidade) {
            buscarMedicosEspecialistas();
        }
    }, [especialidade]);

    const handleSelectChange = (event) => {
        const idSelecionado = event.target.value;
        const medico = medicosEspecialistas.find(m => m.id === Number(idSelecionado));
        setValue('medico', medico);
    };

    useEffect(() => {
        if (paciente?.convenio) {
            setValue("statusPagamento", "Convênio");
        }
    }, [paciente?.convenio, setValue]);

    const especialidades = [
        'Cardiologia',
        'Dermatologia',
        'Endocrinologia',
        'Ginecologia',
        'Neurologia',
        'Oftalmologia',
        'Ortopedia',
        'Pediatria',
        'Psiquiatria',
        'Urologia'
    ];


    return (
        <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
                <div className="px-8 py-10">
                    <h2 className="text-3xl font-bold text-center text-[#29bda6] mb-8">
                        Cadastrar Consulta
                    </h2>

                    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <div className="relative">
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                <Users className="w-4 h-4 mr-2 text-[#29bda6]" />
                                Paciente
                            </label>
                            <input
                                type="text"
                                placeholder="Digite o CPF do paciente"
                                value={cpf}
                                onChange={(e) => setCpf(e.target.value)}
                                onKeyDown={buscaCpfEnter}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#29bda6] focus:border-[#29bda6] transition-colors"
                            />
                            {buscaRealizada && (
                                <p
                                    className={`mt-2 text-sm ${paciente ? "text-green-600" : "text-red-600"
                                        }`}
                                >
                                    {paciente
                                        ? `Paciente encontrado: ${paciente.nome}${paciente.convenio
                                            ? " - Este Paciente possui convênio ✅"
                                            : ""
                                        }`
                                        : "Nenhum Paciente encontrado!"}
                                </p>
                            )}
                        </div>

                        {paciente && !paciente.convenio && (
                            <div className="p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700">
                                <p>Este paciente não possui convênio. Ofertas disponíveis:</p>
                                <ul className="list-disc ml-5">
                                    <li>Consulta particular: R$ 120,00</li>
                                    <li>Pacote familiar: R$ 450,00</li>
                                </ul>
                            </div>)}

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                    <Stethoscope className="w-4 h-4 mr-2 text-[#29bda6]" />
                                    Especialidade
                                </label>
                                <select
                                    name="especialidade"

                                    {...register("especialidade")}
                                    onChange={(e) => {
                                        setEspecialidade(e.target.value)

                                    }}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#29bda6] focus:border-[#29bda6] transition-colors"
                                >
                                    <option value="">Selecione uma especialidade</option>
                                    {especialidades.map((esp) => (
                                        <option key={esp} value={esp}>
                                            {esp}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                    <Calendar className="w-4 h-4 mr-2 text-[#29bda6]" />
                                    Data e Hora
                                </label>
                                <input
                                    type="datetime-local"
                                    {...register("dataHora")}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#29bda6] focus:border-[#29bda6] transition-colors"
                                />
                            </div>
                        </div>


                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                <User className="w-4 h-4 mr-2 text-[#29bda6]" />
                                Médico Responsável
                            </label>
                            <select
                                name="Médico Responsável"
                                onChange={handleSelectChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#29bda6] focus:border-[#29bda6] transition-colors"
                            >
                                <option value="">Médico Responsável</option>
                                {medicosEspecialistas.map((medico) => (
                                    <option key={medico.id} value={medico.id} className='flex justify-between gap-4'>

                                        Dr(a). {medico.nome}
                                        Especialidade: {medico.especialidade}
                                        CRM: {medico.crm}

                                    </option>
                                ))}
                            </select>
                        </div>


                        <div>
                            <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                <MessageCircle className="w-4 h-4 mr-2 text-[#29bda6]" />
                                Queixa
                            </label>
                            <textarea
                                placeholder="Digite a queixa do paciente"
                                {...register("queixa")}
                                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#29bda6] focus:border-[#29bda6] transition-colors h-32 resize-none"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                    <Activity className="w-4 h-4 mr-2 text-[#29bda6]" />
                                    Status da Consulta
                                </label>
                                <select
                                    defaultValue={"Em andamento"}
                                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#29bda6] focus:border-[#29bda6] transition-colors"
                                    {...register("status")}
                                >
                                    <option value="Em andamento">Em andamento</option>

                                </select>
                            </div>
                            {paciente && !paciente.convenio && (
                                <div>
                                    <label className="flex items-center text-sm font-medium text-gray-700 mb-1">
                                        <CreditCard className="w-4 h-4 mr-2 text-[#29bda6]" />
                                        Método de Pagamento
                                    </label>
                                    <select
                                        defaultValue={""}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#29bda6] focus:border-[#29bda6] transition-colors"
                                        {...register("statusPagamento")}
                                    >
                                        <option value="" disabled>
                                            Escolha um método de pagamento
                                        </option>
                                        <option value="Cartão de Crédito">Cartão de Crédito</option>
                                        <option value="Cartão de Débito">Cartão de Débito</option>
                                        <option value="Pix">Pix</option>
                                        <option value="Dinheiro">Dinheiro</option>
                                    </select>
                                </div>
                            )}
                        </div>

                        <div className="pt-6">
                            <button
                                type="submit"
                                className="w-full py-3 px-4 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-[#6366f1] focus:ring-offset-2 text-lg font-medium bg-[#29bda6] hover:bg-[#278b7c] text-white"

                            >
                                Cadastrar Consulta
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default FormConsulta;