





function Cadastro (){
  
  return (
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Nome Completo
        </label>
        <input
          type="text"
          name="name"
          value=''
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
        
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="email"
          name="email"
          value=''
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
       
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Senha
        </label>
        <input
          type="password"
          name="password"
          value=''
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
        
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Confirmar Senha
        </label>
        <input
          type="password"
          name="confirmPassword"
          value=''
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
       
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Idade
        </label>
        <input
          type="number"
          name="age"
          value=''
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
        
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Telefone para Contato
        </label>
        <input
          type="tel"
          name="phone"
          value=''
          
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-teal-500 focus:ring-teal-500"
        />
       
      </div>

      <div>
        <div className="flex items-center">
          <input
            type="checkbox"
            name="hasInsurance"
           
            
            className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
          />
          <label className="ml-2 block text-sm text-gray-700">
            Possui convênio?
          </label>
        </div>
      </div>

      

      <button
        type="submit"
        className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500"
      >
        Criar Conta
      </button>
    </form>
  );
}
export default Cadastro